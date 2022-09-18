#pragma once
#include <iostream>
#include <functional>

using FlyStrategy = std::function<void()>;

void FlyNoWay() {}

FlyStrategy GetFlyWithWingsFunction()
{
	return [flightsCount = 0]() mutable -> void {
		std::cout << "I'm flying with wings!! This is my " << ++flightsCount << " flight." << std::endl;
	};
}