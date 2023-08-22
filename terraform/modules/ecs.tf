# ECS Cluster
resource "aws_ecs_cluster" "fargate_cluster" {
  name = "afourathon-cluster"
}
