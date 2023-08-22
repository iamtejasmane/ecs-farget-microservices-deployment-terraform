# Task definition files
resource "aws_ecs_task_definition" "cab_app_task" {
  family                   = "cab-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      "name" : "cab-app",
      "image" : "${aws_ecr_repository.cab_app.repository_url}:latest",
      "portMappings" : [
        {
          "containerPort" : 3000,
          "protocol" : "tcp"
        }
      ],
      "memoryReservation" : 512,
      "cpu" : 256,
      "environmentFiles" : [
        {
          "value" : "arn:aws:s3:::afourathon/env_files/.env",
          "type" : "s3"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "cab-app-logs",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "cab-app"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "driver_app_task" {
  family                   = "driver-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      "name" : "driver-app",
      "image" : "${aws_ecr_repository.driver_app.repository_url}:latest",
      "portMappings" : [
        {
          "containerPort" : 3000,
          "protocol" : "tcp"
        }
      ],
      "memoryReservation" : 512,
      "cpu" : 256,
      "environmentFiles" : [
        {
          "value" : "arn:aws:s3:::afourathon/env_files/.env",
          "type" : "s3"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "driver-app-logs",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "driver-app"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "cab_assignment_app_task" {
  family                   = "cab-assignment-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      "name" : "cab-assignment-app",
      "image" : "${aws_ecr_repository.cab_assignment_app.repository_url}:latest",
      "portMappings" : [
        {
          "containerPort" : 3000,
          "protocol" : "tcp"
        }
      ],
      "memoryReservation" : 512,
      "cpu" : 256,
      "environmentFiles" : [
        {
          "value" : "arn:aws:s3:::afourathon/env_files/.env",
          "type" : "s3"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "cab-assignment-app-logs",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "cab-assignment-app"
        }
      }
    }
  ])
}


# Update web app task definition with environment variables
resource "aws_ecs_task_definition" "web_app_task" {
  family                   = "web-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      "name" : "web-app",
      "image" : "${aws_ecr_repository.web_app.repository_url}:latest",
      "portMappings" : [
        {
          "containerPort" : 3000,
          "protocol" : "tcp"
        }
      ],
      "memoryReservation" : 512,
      "cpu" : 256,
      "environment" : [
        {
          "name" : "REACT_APP_CAB_API_URL",
          "value" : aws_service_discovery_service.cab_app_service.arn
        },
        {
          "name" : "REACT_APP_DRIVER_API_URL",
          "value" : aws_service_discovery_service.driver_app_service.arn
        },
        {
          "name" : "REACT_APP_CAB_ASSIGN_API_URL",
          "value" : aws_service_discovery_service.cab_assignment_app_service.arn
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "web-app-logs",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "web-app"
        }
      }
    }
  ])
}
