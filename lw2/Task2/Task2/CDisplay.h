#pragma once
#include "IObserver.h"
#include "CWheatherData.h"
#include "SWeatherInfo.h"

class CDisplay : public IObserver<SWeatherInfo>
{
public: 
	CDisplay(CWeatherData& observable) : m_observable(&observable) {}
private:
	/* Метод Update сделан приватным, чтобы ограничить возможность его вызова напрямую
		Классу CObservable он будет доступен все равно, т.к. в интерфейсе IObserver он
		остается публичным
	*/
	void Update(SWeatherInfo const& data) override;	

	CWeatherData* m_observable;
};
