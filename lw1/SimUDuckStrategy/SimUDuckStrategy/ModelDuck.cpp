#include "ModelDuck.h"
#include "FlyNoWay.h"
#include "QuackBehavior.h"
#include "DanceNoWay.h"
#include <iostream>

ModelDuck::ModelDuck()
	: Duck(std::make_unique<FlyNoWay>(), std::make_unique<QuackBehavior>(), std::make_unique<DanceNoWay>())
{}

void ModelDuck::Display() const
{
	std::cout << "I'm model duck" << std::endl;
}
