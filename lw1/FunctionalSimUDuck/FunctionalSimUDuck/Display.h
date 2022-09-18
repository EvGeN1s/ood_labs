#pragma once
#include <iostream>
#include <functional>

using DisplayStrategy = std::function<void()>;

void DecoyDuckDisplay()
{
	std::cout << "I'm decoy duck" << std::endl;
}

void MallardDuckDisplay()
{
	std::cout << "I'm mallard duck" << std::endl;
}

void ModelDuckDisplay()
{
	std::cout << "I'm model duck" << std::endl;
}

void RedheadDuckDisplay()
{
	std::cout << "I'm redhead duck" << std::endl;
}

void RubberDuckDisplay()
{
	std::cout << "I'm rubber duck" << std::endl;
}