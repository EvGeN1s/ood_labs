#pragma once
#include <iostream>
#include <functional>

using QuackStrategy = std::function<void()>;

void QuackNoWay() {}

void Squeek()
{
	std::cout << "Squeek!!!" << std::endl;
}