#include "Duck.h"

Duck::Duck(std::unique_ptr<IFlyBehavior>&& flyBehavior,
	std::unique_ptr<IQuackBehavior>&& quackBehavior,
	std::unique_ptr<IDanceBehavior>&& danceBehavior)
	: m_quackBehavior(std::move(quackBehavior)), m_danceBehavior(std::move(danceBehavior))
{
	assert(m_quackBehavior);
	assert(m_danceBehavior);
	SetFlyBehavior(std::move(flyBehavior));
};

void Duck::Quack() const
{
	m_quackBehavior->Quack();
}

void Duck::Swim()
{
	std::cout << "I'm swimming" << std::endl;
}

void Duck::Fly()
{
	m_flyBehavior->Fly();
}
	
void Duck::Dance()
{
	m_danceBehavior->Dance();
}

void Duck::SetFlyBehavior(std::unique_ptr<IFlyBehavior>&& flyBehavior)
{
	assert(flyBehavior);
	m_flyBehavior = std::move(flyBehavior);
}