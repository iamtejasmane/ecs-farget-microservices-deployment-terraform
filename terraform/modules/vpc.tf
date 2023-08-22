# VPC Resources

resource "aws_subnet" "private_subnet_1" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1b"
  cidr_block              = "172.31.16.0/20"
  map_public_ip_on_launch = false
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1c"
  cidr_block              = "172.31.32.0/20"
  map_public_ip_on_launch = false
}

resource "aws_db_subnet_group" "mysql_subnet_group" {
  name       = "mysql-subnet-group"
  subnet_ids = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]
}


resource "aws_subnet" "public_subnet" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1a"
  cidr_block              = "172.31.80.0/20"
  map_public_ip_on_launch = true
}


data "aws_vpc" "main_vpc" {
  id = var.vpc_id
}
