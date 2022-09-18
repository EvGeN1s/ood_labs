#include "CStatsDisplay.h"
#include <iostream>

void CStatsDisplay::Update(SWeatherInfo const& data)
{

	for (auto& measurment : m_measurments)
	{
		double measurmentValue = GetMesurment(data, measurment.type);
		UpdateMeasurment(measurment, measurmentValue);
	}
	++m_countAcc;

	PrintMeasurments();
}

double CStatsDisplay::GetMesurment(SWeatherInfo const& data, MeasurmentType type)
{
	switch (type)
	{
	case MeasurmentType::TEMPEARTURE:
		return data.temperature;
	case MeasurmentType::HUMIDITY:
		return data.humidity;
	case MeasurmentType::PRESSURE:
		return data.pressure;
	default:
		return 0;
	}
}

void CStatsDisplay::UpdateMeasurment(StatsMesaurment& measurment, double value)
{
	if (measurment.min > value)
	{
		measurment.min = value;
	}
	if (measurment.max < value)
	{
		measurment.max = value;
	}

	measurment.acc += value;
}

void CStatsDisplay::PrintMeasurments()const
{
	for (auto& measurment : m_measurments)
	{
		PrintMeasurment(measurment);
	}
}

void CStatsDisplay::PrintMeasurment(const StatsMesaurment& measurment)const
{
	std::string measurmentType = MeasurmentTypeToString.find(measurment.type)->second;

	std::cout << "Max " << measurmentType << " " << measurment.max << std::endl;
	std::cout << "Min " << measurmentType << " " << measurment.min << std::endl;
	std::cout << "Average " << measurmentType << " " << (measurment.acc / m_countAcc) << std::endl;
	std::cout << "----------------" << std::endl;
}
