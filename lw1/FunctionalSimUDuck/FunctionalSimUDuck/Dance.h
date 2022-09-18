#pragma once
#include <iostream>
#include <functional>

using DanceStrategy = std::function<void()>;

void DanceNoWay() {}

void DanceWaltz()
{
	std::cout << "I'm dancing waltz!!!\n";
};

void DanceMinuete() {
	std::cout << "I'm dancing minuete!!!\n";
}