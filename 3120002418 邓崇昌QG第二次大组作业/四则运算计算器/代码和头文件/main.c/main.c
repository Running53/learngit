#include "calculator.h"
int main()
{
	mainmenuface();
	int options;
	double e;
	char b[100]={0}; //������׺���ʽ������  
	char d[100]={0}; //���ɷָ�����׺���ʽ 
	char c[100]={0}; //���ɺ�׺���ʽ������
	expression1 *middle=(expression1 *)malloc(sizeof(expression1));	//����׺���ʽ��Ϊ��׺���ʽ��˳��ջ  
	expression2 *behind=(expression2 *)malloc(sizeof(expression2));	//����׺���ʽ��Ϊֵ��˳��ջ 
	middle->top=-1;
	behind->top=-1;
	while(1)
	{
		printf("�����������Ž��в�����\n");
		while(checkout1(&options))
	{
		printf("��������ַ�����ȷ�����������룺\n");
	}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			printf("����������Ҫ�����ʽ�ӣ�\n");
			while(checkout2(b))
			{
				system("cls");
				mainmenuface();
				printf("������ı��ʽ����ȷ�����������룺\n");
			} 	
			devide(b,d);						//�ÿո�ָ���׺���ʽ 
			changesuffix(d,middle,c);			//����׺���ʽת��Ϊ��׺���ʽ 
			e=calculate(c,behind);				//�����׺���ʽ	
			printf("���ı��ʽ��ֵΪ%f\n",e);
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
			printf("����������ֲ�����Ч��Χ�ڣ�");	
	}
	}
	return 0; 	
}
