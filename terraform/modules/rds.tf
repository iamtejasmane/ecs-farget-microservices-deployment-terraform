# RDS Resources

resource "aws_db_parameter_group" "mysql_parameter_group" {
  name        = "mysql-parameter-group"
  family      = "mysql5.7"
  description = "Custom DB parameter group for MySQL 5.7"
}

resource "aws_security_group" "rds_security_group" {
  name        = "rds-security-group"
  description = "Security group for RDS DB instance"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [data.aws_vpc.main_vpc.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "mysql_instance" {
  allocated_storage    = 5
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "5.7"
  instance_class       = "db.t3.micro"
  db_name              = var.db_name
  username             = var.username
  password             = var.password
  parameter_group_name = aws_db_parameter_group.mysql_parameter_group.name
  db_subnet_group_name = aws_db_subnet_group.mysql_subnet_group.name

  vpc_security_group_ids = [
    aws_security_group.rds_security_group.id
  ]
}
