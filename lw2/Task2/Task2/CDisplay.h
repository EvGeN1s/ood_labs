#pragma once
#include "IObserver.h"
#include "CWheatherData.h"
#include "SWeatherInfo.h"

class CDisplay : public IObserver<SWeatherInfo>
{
public: 
	CDisplay(CWeatherData& observable) : m_observable(&observable) {}
private:
	/* ����� Update ������ ���������, ����� ���������� ����������� ��� ������ ��������
		������ CObservable �� ����� �������� ��� �����, �.�. � ���������� IObserver ��
		�������� ���������
	*/
	void Update(SWeatherInfo const& data) override;	

	CWeatherData* m_observable;
};
