#include "FlyWithWings.h"

void FlyWithWings::Fly()
{
	m_flightsCount++;
	std::cout << "I'm flying with wings!! This is my " << m_flightsCount << " flight." << std::endl;
}
