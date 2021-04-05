#include "LinkStack.h"
extern int flag;
extern int judge;
int main()
{
	int options;
	mainmenuface();
	LinkStack s;
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
			initLStack(&s);//初始化栈
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
			isEmptyLStack(&s);
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
				getTopLStack(&s,&e);
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
			clearLStack(&s);//清空栈
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("栈已被销毁或未被初始化，不可再次销毁！\n");
			}
			else 
			destroyLStack(&s);//销毁栈
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
			LStackLength(&s,&length);//检测栈长度
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
			pushLStack(&s,data);//入栈
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
			ElemType data;
			popLStack(&s,&data);//出栈
			} 
			break;
		case 9:
			system("cls");
			mainmenuface();	
			if(flag!=1)
			{
				printf("栈已被销毁或未被初始化，不可遍历！\n");
				break;
			}
			else
			{
				traversal(&s);
 		    } 
 		    break;
		default: 
	   	    printf("您输入的数字不在有效范围内！"); 
	}
	}
	return 0; 
}
