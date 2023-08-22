# Create AWS Cloud Map private DNS namespace
resource "aws_service_discovery_private_dns_namespace" "private_dns_namespace" {
  name = "afourathon-private-namespace"
  vpc  = var.vpc_id
}

# Create AWS Cloud Map service for cab app
resource "aws_service_discovery_service" "cab_app_service" {
  name         = "cab-app-service"
  namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
    dns_records {
      ttl  = 10
      type = "A"
    }
    routing_policy = "MULTIVALUE"
  }
}

# Create AWS Cloud Map service for driver app
resource "aws_service_discovery_service" "driver_app_service" {
  name         = "driver-app-service"
  namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
    dns_records {
      ttl  = 10
      type = "A"
    }
    routing_policy = "MULTIVALUE"
  }
}

# Create AWS Cloud Map service for cab assignment app
resource "aws_service_discovery_service" "cab_assignment_app_service" {
  name         = "cab-assignment-app-service"
  namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.private_dns_namespace.id
    dns_records {
      ttl  = 10
      type = "A"
    }
    routing_policy = "MULTIVALUE"
  }
}
