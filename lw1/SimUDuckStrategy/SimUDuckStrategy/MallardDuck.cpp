#include "MallardDuck.h"
#include "Duck.h"
#include "QuackBehavior.h"
#include "WaltzDanceBehavior.h"

MallardDuck::MallardDuck() 
	: Duck(std::make_unique<FlyWithWings>(), std::make_unique<QuackBehavior>(), std::make_unique<WaltzDanceBehavior>())
{}

void MallardDuck::Display() const
{
	std::cout << "I'm mallard duck" << std::endl;
}