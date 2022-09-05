#include "DecoyDuck.h"
#include "FlyNoWay.h"
#include "MuteQuackBehavior.h"
#include "DanceNoWay.h"

DecoyDuck::DecoyDuck()
	: Duck(std::make_unique<FlyNoWay>(), std::make_unique<MuteQuackBehavior>(), std::make_unique<DanceNoWay>())
{}

void DecoyDuck::Display() const
{
	std::cout << "I'm decoy duck" << std::endl;
}