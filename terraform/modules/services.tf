
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
