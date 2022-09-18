#pragma once
#include <map>
#include <string>

enum class MeasurmentType {
	TEMPEARTURE = 0,
	HUMIDITY,
	PRESSURE,
};

std::map<MeasurmentType, std::string> const MeasurmentTypeToString = {
	{ MeasurmentType::TEMPEARTURE, "Teamperature" },
	{ MeasurmentType::HUMIDITY, "Humidity" },
	{ MeasurmentType::PRESSURE, "Pressure" },
};

struct SWeatherInfo
{
	double temperature = 0;
	double humidity = 0;
	double pressure = 0;
};