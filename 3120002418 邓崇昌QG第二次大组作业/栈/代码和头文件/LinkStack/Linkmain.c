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
		printf("�����������Ž��в�����\n");
		while(checkout(&options))
	{
		printf("��������ַ�����ȷ�����������룺\n");
	}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			initLStack(&s);//��ʼ��ջ
			break;
			
		case 2:	
			system("cls");
			mainmenuface();
			if(flag!=1)
			{ 
			printf("ջ��δ����ʼ�����ѱ����٣������ж�ջ�Ƿ�Ϊ�գ�\n");
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
				printf("ջ��δ����ʼ�����ѱ����٣����ɵõ�ջ��Ԫ�أ�\n");
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
				printf("ջ��δ����ʼ�����ѱ����٣��������ջ��\n");
			}
			else
			clearLStack(&s);//���ջ
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ����ʼ���������ٴ����٣�\n");
			}
			else 
			destroyLStack(&s);//����ջ
			break;
			
		case 6:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ����ʼ�������ɼ�ⳤ�ȣ�\n");
			}
			else
			{
			int length;
			LStackLength(&s,&length);//���ջ����
			}
			break;
			
		case 7:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ����ʼ����������ջ��\n");
				break;
			}
			printf("������������ջ�����֣�\n");
			int data;
			while(checkout(&data))
			{
				printf("��������ַ�����ȷ�����������룺\n");
			}
			pushLStack(&s,data);//��ջ
			break;
		case 8:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ��ʼ�������ɳ�ջ��\n");
			}
			else
			{
			ElemType data;
			popLStack(&s,&data);//��ջ
			} 
			break;
		case 9:
			system("cls");
			mainmenuface();	
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ����ʼ�������ɱ�����\n");
				break;
			}
			else
			{
				traversal(&s);
 		    } 
 		    break;
		default: 
	   	    printf("����������ֲ�����Ч��Χ�ڣ�"); 
	}
	}
	return 0; 
}
