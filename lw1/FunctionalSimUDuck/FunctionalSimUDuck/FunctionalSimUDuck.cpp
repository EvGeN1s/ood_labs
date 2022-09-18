#include <functional>
#include <iostream>

#include "DuckContext.h"

void PlayWithDuck(DuckContext& context)
{
	context.Display();
	context.Quack();
	context.Fly();
	context.Dance();
	std::cout << std::endl;
}

int main()
{
	DuckContext mallardDuckFunction(MallardDuckDisplay, Squeek, GetFlyWithWingsFunction(), DanceWaltz);
	PlayWithDuck(mallardDuckFunction);
	PlayWithDuck(mallardDuckFunction);
	mallardDuckFunction.SetFlyStrategy(FlyNoWay);
	PlayWithDuck(mallardDuckFunction);

	DuckContext redheadDuckFunction(RedheadDuckDisplay, Squeek, GetFlyWithWingsFunction(), DanceMinuete);
	PlayWithDuck(redheadDuckFunction);

	DuckContext decoyDuckFunction(DecoyDuckDisplay, QuackNoWay, FlyNoWay, DanceNoWay);
	PlayWithDuck(decoyDuckFunction);

	DuckContext modelDuckFunction(MallardDuckDisplay, QuackNoWay, FlyNoWay, DanceNoWay);
	PlayWithDuck(modelDuckFunction);

	DuckContext rubberDuckFunction(RubberDuckDisplay, QuackNoWay, FlyNoWay, DanceNoWay);
	PlayWithDuck(rubberDuckFunction);
}
