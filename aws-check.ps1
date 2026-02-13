# ========================================
# Full AWS Resource Scan Across All Regions
# ========================================

# Get all AWS regions as an array
$regions = (aws ec2 describe-regions --query "Regions[*].RegionName" --output text) -split "\s+"

# Check S3 Buckets globally (S3 is global)
Write-Host "`n=== Checking S3 Buckets (global) ==="
$s3buckets = aws s3 ls
Write-Host $s3buckets

foreach ($bucket in $s3buckets -split "`n") {
    if ($bucket) {
        $bucketName = ($bucket -split "\s+")[2]
        Write-Host "`n-- Contents of S3 bucket: $bucketName --"
        aws s3 ls "s3://$bucketName" --recursive --human-readable --summarize
    }
}

# Loop through each region
foreach ($region in $regions) {
    Write-Host "`n========================================="
    Write-Host "=== Scanning AWS Resources in region: $region ==="
    Write-Host "========================================="

    # EC2
    Write-Host "`n--- EC2 Instances ---"
    aws ec2 describe-instances --region $region --query "Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]" --output table

    Write-Host "`n--- EC2 Volumes ---"
    aws ec2 describe-volumes --region $region --query "Volumes[*].[VolumeId,State,Size]" --output table

    Write-Host "`n--- EC2 Snapshots ---"
    aws ec2 describe-snapshots --region $region --owner-ids self --query "Snapshots[*].[SnapshotId,State,VolumeId,StartTime]" --output table

    Write-Host "`n--- EC2 Elastic IPs ---"
    aws ec2 describe-addresses --region $region --query "Addresses[*].[AllocationId,PublicIp,InstanceId]" --output table

    Write-Host "`n--- Load Balancers ---"
    aws elbv2 describe-load-balancers --region $region --query "LoadBalancers[*].[LoadBalancerName,State.Code,Type]" --output table

    # RDS
    Write-Host "`n--- RDS Instances ---"
    aws rds describe-db-instances --region $region --query "DBInstances[*].[DBInstanceIdentifier,DBInstanceStatus,Engine]" --output table

    Write-Host "`n--- RDS Snapshots ---"
    aws rds describe-db-snapshots --region $region --query "DBSnapshots[*].[DBSnapshotIdentifier,DBInstanceIdentifier,Status,SnapshotType]" --output table

    # ECS
    Write-Host "`n--- ECS Clusters ---"
    $clusters = (aws ecs list-clusters --region $region --query "clusterArns" --output text) -split "\s+"
    if ($clusters) {
        foreach ($cluster in $clusters) {
            Write-Host "Cluster: $cluster"
            aws ecs list-services --region $region --cluster $cluster --output table
            aws ecs list-tasks --region $region --cluster $cluster --output table
        }
    } else {
        Write-Host "No ECS clusters in $region"
    }

    # ECR
    Write-Host "`n--- ECR Repositories ---"
    aws ecr describe-repositories --region $region --query "repositories[*].[repositoryName,repositoryUri]" --output table

    # CloudWatch Logs
    Write-Host "`n--- CloudWatch Log Groups ---"
    aws logs describe-log-groups --region $region --query "logGroups[*].[logGroupName,storedBytes]" --output table

    # Amplify
    Write-Host "`n--- Amplify Apps ---"
    aws amplify list-apps --region $region --query "apps[*].[appId,name,repository,platform]" --output table

    # Lambda
    Write-Host "`n--- Lambda Functions ---"
    aws lambda list-functions --region $region --query "Functions[*].[FunctionName,Runtime,LastModified]" --output table

    # API Gateway (REST)
    Write-Host "`n--- API Gateway REST APIs ---"
    aws apigateway get-rest-apis --region $region --query "items[*].[id,name]" --output table

    # EventBridge
    Write-Host "`n--- EventBridge Rules ---"
    aws events list-rules --region $region --query "Rules[*].[Name,State]" --output table

    # Step Functions
    Write-Host "`n--- Step Functions ---"
    aws stepfunctions list-state-machines --region $region --query "stateMachines[*].[name,stateMachineArn]" --output table

    # VPC / Networking
    Write-Host "`n--- VPCs ---"
    aws ec2 describe-vpcs --region $region --query "Vpcs[*].[VpcId]" --output table
    Write-Host "`n--- Subnets ---"
    aws ec2 describe-subnets --region $region --query "Subnets[*].[SubnetId]" --output table
    Write-Host "`n--- Internet Gateways ---"
    aws ec2 describe-internet-gateways --region $region --query "InternetGateways[*].[InternetGatewayId]" --output table
    Write-Host "`n--- NAT Gateways ---"
    aws ec2 describe-nat-gateways --region $region --query "NatGateways[*].[NatGatewayId,State]" --output table
}

# IAM (global)
Write-Host "`n=== IAM Users ==="
aws iam list-users --query "Users[*].[UserName,CreateDate]" --output table

Write-Host "`n=== IAM Roles ==="
aws iam list-roles --query "Roles[*].[RoleName,CreateDate]" --output table

Write-Host "`n=== IAM Policies ==="
aws iam list-policies --scope Local --query "Policies[*].[PolicyName,CreateDate]" --output table

Write-Host "`n=== Finished checking all AWS resources across all regions ==="
