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
			int sizes;
			printf("����������Ҫ��ʼջ�Ĵ�С��\n");
			while(checkout(&sizes))
			{
				printf("��������ַ�����ȷ�����������룺\n");
			}
			if(judge!=0)
			initStack(&s,sizes);		//��ʼ��ջ
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
			int length;
			stackLength(&s,&length);	//���ջ����
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
			getTopStack(&s,&e); 	//�õ�ջ��Ԫ��
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
			clearStack(&s);		//���ջ
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ����ʼ���������ٴ����٣�\n");
			}
			else 
			destroyStack(&s); 	//����ջ 
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
			stackLength(&s,&length);	//���ջ����
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
			pushStack(&s,data);	//��ջ	
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
			ElemType a;
			popStack(&s,&a);//��ջ	
			} 
			break;
		case 9:
	   		system("cls");
			mainmenuface();
			if(flag!=1)
			{
				printf("ջ�ѱ����ٻ�δ��ʼ�������ɳ�ջ��\n");
			}
			else		
			traversal(&s);
			break;
		default: 
	   	    printf("����������ֲ�����Ч��Χ�ڣ�");  	 	
	}
	}
	return 0; 
}
