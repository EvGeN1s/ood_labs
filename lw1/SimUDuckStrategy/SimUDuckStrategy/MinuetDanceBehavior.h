#pragma once
#include "IDanceBehavior.h"
#include <iostream>

class MinuetDanceBehavior : public IDanceBehavior
{
public:
	void Dance() override;
};
