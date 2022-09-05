#include "RubberDuck.h"
#include "FlyNoWay.h"
#include "SqueakBehavior.h"
#include "DanceNoWay.h"

RubberDuck::RubberDuck()
	: Duck(std::make_unique<FlyNoWay>(), std::make_unique<SqueakBehavior>(), std::make_unique<DanceNoWay>())
{}

void RubberDuck::Display() const
{
	std::cout << "I'm rubber duck" << std::endl;
}