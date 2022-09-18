#pragma once
#include <utility>

#include "Dance.h"
#include "Display.h"
#include "Fly.h"
#include "Quack.h"

class DuckContext
{
public:
	DuckContext(
		DisplayStrategy displayStrategy,
		QuackStrategy quackStrategy,
		FlyStrategy flyStrategy,
		DanceStrategy danceStrategy
	): m_displayStrategy(std::move(displayStrategy)),
		m_quackStrategy(std::move(quackStrategy)),
		m_flyStrategy(std::move(flyStrategy)),
		m_danceStrategy(std::move(danceStrategy))
	{}

	void Display()
	{
		if (m_displayStrategy)
		{
			m_displayStrategy();
		}
	}

	void Quack()
	{
		if (m_quackStrategy)
		{
			m_quackStrategy();
		}
	}

	void Fly()
	{
		if (m_flyStrategy)
		{
			m_flyStrategy();
		}
	}

	void SetFlyStrategy(FlyStrategy strategy)
	{
		if (strategy)
		{
			m_flyStrategy = std::move(strategy);
		}
	}

	void Dance()
	{
		if (m_danceStrategy)
		{
			m_danceStrategy();
		}
	}

private:
	DisplayStrategy m_displayStrategy;
	QuackStrategy m_quackStrategy;
	FlyStrategy m_flyStrategy;
	DanceStrategy m_danceStrategy;
};

