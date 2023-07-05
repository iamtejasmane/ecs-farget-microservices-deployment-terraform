resource "aws_ecs_cluster" "fargate_cluster" {
  name = "afourathon-cluster"
}

resource "aws_ecs_task_definition" "cab_app_task" {
  family                   = "cab-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256" 
  memory = "512"

  container_definitions = <<DEFINITION
  [
    {
      "name": "cab-app",
      "image": "${aws_ecr_repository.cab_app.repository_url}:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "memoryReservation": 512,
      "cpu": 256,
      "environmentFiles": [
        {
          "value": "arn:aws:s3:::afourathon/env_files/.env",
          "type": "s3"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-create-group": "true",
          "awslogs-group": "cab-app-logs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "cab-app"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "driver_app_task" {
  family                   = "driver-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256" 
  memory = "512"

  container_definitions = <<DEFINITION
  [
    {
      "name": "driver-app",
      "image": "${aws_ecr_repository.driver_app.repository_url}:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "memoryReservation": 512,
      "cpu": 256,
      "environmentFiles": [
        {
          "value": "arn:aws:s3:::afourathon/env_files/.env",
          "type": "s3"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-create-group": "true",
          "awslogs-group": "driver-app-logs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "driver-app"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "cab_assignment_app_task" {
  family                   = "cab-assignment-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256" 
  memory = "512"

  container_definitions = <<DEFINITION
  [
    {
      "name": "cab-assignment-app",
      "image": "${aws_ecr_repository.cab_assignment_app.repository_url}:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "memoryReservation": 512,
      "cpu": 256,
      "environmentFiles": [
        {
          "value": "arn:aws:s3:::afourathon/env_files/.env",
          "type": "s3"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-create-group": "true",
          "awslogs-group": "cab-assignment-app-logs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "cab-assignment-app"
        }
      }
    }
  ]
  DEFINITION
}
resource "aws_ecs_task_definition" "web_app_task" {
  family                   = "web-app"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256" 
  memory = "512"

  container_definitions = <<DEFINITION
  [
    {
      "name": "web-app",
      "image": "${aws_ecr_repository.web_app.repository_url}:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "memoryReservation": 512,
      "cpu": 256,
      "environmentFiles": [
        {
          "value": "arn:aws:s3:::afourathon/env_files/.env",
          "type": "s3"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-create-group": "true",
          "awslogs-group": "web-app-logs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "web-app"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_service" "cab_app_service" {
  name            = "cab-app-service"
  cluster         = aws_ecs_cluster.fargate_cluster.id
  task_definition = aws_ecs_task_definition.cab_app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_security_group.id]
    assign_public_ip = true
  }
}


resource "aws_ecs_service" "driver_app_service" {
  name            = "driver-app-service"
  cluster         = aws_ecs_cluster.fargate_cluster.id
  task_definition = aws_ecs_task_definition.driver_app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_security_group.id]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "cab_assignment_app_service" {
  name            = "cab-assignment-app-service"
  cluster         = aws_ecs_cluster.fargate_cluster.id
  task_definition = aws_ecs_task_definition.cab_assignment_app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_security_group.id]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "web_app_service" {
  name            = "web-app-service"
  cluster         = aws_ecs_cluster.fargate_cluster.id
  task_definition = aws_ecs_task_definition.web_app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_security_group.id]
    assign_public_ip = true
  }
}

resource "aws_security_group" "ecs_service_security_group" {
  name        = "ecs-service-security-group"
  description = "Security group for ECS Fargate services"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}


resource "aws_iam_role" "ecs_task_role" {
  name = "ecs-task-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "ecs_s3_access" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  role       = aws_iam_role.ecs_task_execution_role.name
}

resource "aws_iam_role_policy" "ecs_task_execution_role_policy" {
  name   = "ecs-task-execution-role-policy"
  role   = aws_iam_role.ecs_task_execution_role.name
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchLogsPermissions",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
POLICY
}


resource "aws_subnet" "public_subnet" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1a"
  cidr_block              = "172.31.80.0/20"
  map_public_ip_on_launch = true
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecr_repository" "cab_app" {
  name = "cab-app"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecr_repository" "driver_app" {
  name = "driver-app"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecr_repository" "cab_assignment_app" {
  name = "cab-assignment-app"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecr_repository" "web_app" {
  name = "web-app"
  lifecycle {
    prevent_destroy = true
  }
}