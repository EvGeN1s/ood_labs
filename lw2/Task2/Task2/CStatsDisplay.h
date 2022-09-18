#pragma once
#include <algorithm>
#include "IObserver.h"
#include "CWheatherData.h"
#include "SWeatherInfo.h"
#include <vector>

struct StatsMesaurment {
	MeasurmentType type;
	double min = std::numeric_limits<double>::infinity();
	double max = -std::numeric_limits<double>::infinity();
	double acc = 0;
};

class CStatsDisplay : public IObserver<SWeatherInfo>
{
private:
	/* Метод Update сделан приватным, чтобы ограничить возможность его вызова напрямую
	Классу CObservable он будет доступен все равно, т.к. в интерфейсе IObserver он
	остается публичным
	*/
	void Update(SWeatherInfo const& data) override;

	double GetMesurment(SWeatherInfo const& data, MeasurmentType type);
	void UpdateMeasurment(StatsMesaurment& measurment, double value);

	void PrintMeasurments()const;
	void PrintMeasurment(const StatsMesaurment& measurment)const;

	double m_minTemperature = std::numeric_limits<double>::infinity();
	double m_maxTemperature = -std::numeric_limits<double>::infinity();
	double m_accTemperature = 0;
	unsigned m_countAcc = 0;

	std::vector<StatsMesaurment>  m_measurments = {
		{MeasurmentType::TEMPEARTURE},
		{MeasurmentType::HUMIDITY},
		{MeasurmentType::PRESSURE},
	};
};
