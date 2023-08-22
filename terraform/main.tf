// Modules 

module "vpc" {
  source = "./modules/vpc"
  vpc_id = var.vpc_id
}

module "rds" {
  source = "./modules/rds"
  vpc_id = var.vpc_id
}

module "ecs" {
  source = "./modules/ecs"
  vpc_id = var.vpc_id
}

module "cloudmap" {
  source = "./modules/cloudmap"
  vpc_id = var.vpc_id
}

module "security" {
  source = "./modules/security"
  vpc_id = var.vpc_id
}

module "task_definitions" {
  source = "./modules/task_definitions"
}

module "services" {
  source = "./modules/services"
}

module "repositories" {
  source = "./modules/repositories"
}



