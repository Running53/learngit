#include "SqStack.h"
extern int judge;
extern int flag;
int main()
{
	mainmenuface();
	int options;
	SqStack s;
	while(1)
	{
		printf("请输入操作编号进行操作！\n");
		while(checkout(&options))
	{
		printf("您输入的字符不正确，请重新输入：\n");
	}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			int sizes;
			printf("请输入您想要初始栈的大小：\n");
			while(checkout(&sizes))
			{
				printf("您输入的字符不正确，请重新输入：\n");
			}
			if(judge!=0)
			initStack(&s,sizes);		//初始化栈
			break;
			
		case 2:	
			system("cls");
			mainmenuface();
			if(flag!=1)
			{ 
			printf("栈还未被初始化或已被销毁！不可判断栈是否为空！\n");
			} 
			else 
			{
			int length;
			stackLength(&s,&length);	//检测栈长度
			}
			break;
			
		case 3:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈还未被初始化或已被销毁！不可得到栈顶元素！\n");
			}
			else
			{
			int e;
			getTopStack(&s,&e); 	//得到栈顶元素
			}
			
			break;
		case 4:
	 		system("cls");
			mainmenuface();	
			if(flag!=1)
			{
				printf("栈还未被初始化或已被销毁！不可清空栈！\n");
			}
			else
			clearStack(&s);		//清空栈
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或未被初始化，不可再次销毁！\n");
			}
			else 
			destroyStack(&s); 	//销毁栈 
			break;
			
		case 6:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或未被初始化，不可检测长度！\n");
			}
			else
			{
			int length;
			stackLength(&s,&length);	//检测栈长度
			}
			break;
			
		case 7:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或未被初始化，不可入栈！\n");
				break;
			}
			printf("请输入您想入栈的数字：\n");
			int data;
			while(checkout(&data))
			{
				printf("您输入的字符不正确，请重新输入：\n");
			}
			pushStack(&s,data);	//入栈	
			break;
		case 8:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或还未初始化，不可出栈！\n");
			}
			else
			{
			ElemType a;
			popStack(&s,&a);//出栈	
			} 
			break;
		case 9:
	   		system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或还未初始化，不可出栈！\n");
			}
			else		
			traversal(&s);
			break;
		default: 
	   	    printf("您输入的数字不在有效范围内！");  	 	
	}
	}
	return 0; 
}
