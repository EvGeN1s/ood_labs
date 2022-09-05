#pragma once
#include <iostream>
#include "IQuackBehavior.h"

class QuackBehavior : public IQuackBehavior
{
public:
	void Quack() override;
};
