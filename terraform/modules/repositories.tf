# ECR Repository Resources

resource "aws_ecr_repository" "cab_app" {
  name = "cab-app"
}

resource "aws_ecr_repository" "driver_app" {
  name = "driver-app"
}

resource "aws_ecr_repository" "cab_assignment_app" {
  name = "cab-assignment-app"
}

resource "aws_ecr_repository" "web_app" {
  name = "web-app"
}
