#include "linkedList.h"
extern LinkedList record;		//���ڲ���ʱ��¼��Ҫ������ĵ�ַ 
extern LinkedList head;
extern LinkedList q;			//����ָ��Ҫ����Ľ�� 
extern int judge;
int main()
{
	mainmenuface();
	ElemType *q1=NULL;
	ElemType i;  			//������ѯ�ڵ��Ƿ���ڵı��� 
 	int options;
    while (1){
 	loop:
	printf("-------------------��ѡ�����Ĳ�����ţ�----------------------\n");
    while(inputCheck(&options))
    {
    	printf("�����������������룺\n");
	} 
	 switch(options)
	 {
 		 case 1:
  		 system("cls");			//�����Ļ 
 	 	 mainmenuface();		
		 InitList(&head); 		//��ʼ������ 
		 goto loop;
		 break;
		 
		 case 2:
		 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,����ѡ�����1��ʼ������\n"); 
 		 else
 		 {
 		 select1();			//�ں���ѡ��ڵ�Ͳ���ڵ�ĺ��� 	  	 			 
	  	 }	 	
		 break;
		 
		 case 3:
		 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,����ѡ�����1��ʼ������\n"); 
 		 else if(head->next==NULL)
 		 printf("���������Ѿ���ʼ������δ�������,���޷�ִ�б�������������ѡ�����2Ϊ�����������\n"); 
	 	 else 
	  	 TraverseList(head,print); //����������� 
	 	 break;
	 	 
	 	 case 4:
	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ���������������ѡ�����1��ʼ������\n");
 		 else 
 	 	 ReverseList(&head);  //ʹ�������� 
 	 	 break;
 	 	 
 	 	 case 5:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ�д˲���������ѡ�����1��ʼ������\n");
 		 else if(head->next==NULL)
 		 printf("�����������Բ����м�ڵ㣡��������ݣ�\n");
 		 else
 	 	 FindMidNode(&head);	//�����м�ڵ� 
 	 	 break;
 	 	 
 	 	 case 6:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ��ɾ������������ѡ�����1��ʼ������\n");
 		 else 
 		 {
 		 if(head->next->next==NULL)
 		 printf("������ֻ��һ����������ݣ��޷�������һ���ڵ����ݽ���ɾ����\n");
 		 else
 		 {
	  	 select2();
	  	 if(judge!=0)
 	 	 DeleteList(record,q1);	//ɾ��ָ���ڵ� 
		 }	 	 
	  	 }
 	 	 break;
 	 	 
 	 	 case 7:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 int number;
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ�в�ѯ����������ѡ�����1��ʼ������\n"); 
 		 else
		 {
 	     printf("��������Ҫ��ѯ�����ݣ�\n")	;
 	 	 while(inputCheck(&number))
   		 {
    	 printf("�����������������룺\n");
	     } 
	  	 if(judge!=0)								   
 	 	 SearchList(head,i);	//��ѯ�ڵ��Ƿ����
		 }	 
 	 	 break;
 	 	 
 	 	 case 8:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
	     IsLoopList(head); //�ж������Ƿ�ɻ� 
 	 	 break;	
 	 	 
 	 	 case 9:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ�����ٲ���������ѡ�����1��ʼ������\n"); 
 		 else
 	 	 DestroyList(&head); //�������� 
 	 	 break; 
 	 	 
 	 	 case 10:
 	 	 system("cls");			//�����Ļ 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ�д˲���������ѡ�����1��ʼ������\n"); 
 		 else
 	 	 ReverseEvenList(&head); //��ż�ڵ㽻�� 
 	 	 break; 
 	 	 
 	  	 default:
 	  	 printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
	 }
     }    
	 return 0;
}
