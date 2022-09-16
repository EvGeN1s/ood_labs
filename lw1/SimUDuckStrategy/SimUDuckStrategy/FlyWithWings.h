#pragma once
#include <iostream>
#include "IFlyBehavior.h"

class FlyWithWings : public IFlyBehavior
{
public:
	void Fly() override;
private:
	size_t m_flightsCount = 0;
};