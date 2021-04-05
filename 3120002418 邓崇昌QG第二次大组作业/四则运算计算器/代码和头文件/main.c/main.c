#include "calculator.h"
int main()
{
	mainmenuface();
	int options;
	double e;
	char b[100]={0}; //容纳中缀表达式的数组  
	char d[100]={0}; //容纳分割后的中缀表达式 
	char c[100]={0}; //容纳后缀表达式的数组
	expression1 *middle=(expression1 *)malloc(sizeof(expression1));	//将中缀表达式变为后缀表达式的顺序栈  
	expression2 *behind=(expression2 *)malloc(sizeof(expression2));	//将后缀表达式变为值的顺序栈 
	middle->top=-1;
	behind->top=-1;
	while(1)
	{
		printf("请输入操作编号进行操作！\n");
		while(checkout1(&options))
	{
		printf("您输入的字符不正确，请重新输入：\n");
	}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			printf("请输入您想要计算的式子：\n");
			while(checkout2(b))
			{
				system("cls");
				mainmenuface();
				printf("您输入的表达式不正确，请重新输入：\n");
			} 	
			devide(b,d);						//用空格分割中缀表达式 
			changesuffix(d,middle,c);			//将中缀表达式转化为后缀表达式 
			e=calculate(c,behind);				//计算后缀表达式	
			printf("您的表达式的值为%f\n",e);
			clear(b);
			clear(c);
			clear(d);
			middle->top=-1;
			behind->top=-1;	
			break;	
			
		case 2:	
			system("cls");
			mainmenuface();
			exit(1);
			
		default:
			printf("您输入的数字不在有效范围内！");	
	}
	}
	return 0; 	
}
