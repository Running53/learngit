#include "duLinkedList.h"
extern DuLinkedList head;
extern DuLinkedList record;		//���ڲ���ʱ��¼��Ҫ������ĵ�ַ 
extern DuLinkedList q;			//����ָ��Ҫ����Ľ��
extern int i;
extern int judge;
int main()
{
	mainmenuface();
	ElemType *q1;
 	ElemType options;
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
 		 system("cls");
	 	 mainmenuface();
		 InitList_DuL(&head); 		//��ʼ������ 
		 goto loop;
		 break;
		 
		 case 2:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	 printf("��������û�г�ʼ�����ѱ�����,���޷�ִ�����ٲ���������ѡ�����1��ʼ������\n"); 
		 } 
		 else
 	 	 DestroyList_DuL(&head); //�������� 
 	 	 break; 
 	 	 
		 case 3:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	printf("����û��ʼ�������޷�ִ��ǰ�����������ѡ�����1��ʼ������\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("�����Ѿ���ʼ��������û�о������ݵĽڵ㣬���޷�ִ��ǰ�����������ͨ��ѡ�����4��ӽڵ㣡\n");
		 }
		 else
		 {
		 i=1;
		 select();	
		 if(judge==1)
		 InsertBeforeList_DuL(record, q); 	   //�ڽڵ�֮ǰ�����µĽڵ� 
		 }
		 break;
		 
		 case 4:
		 system("cls");
	 	 mainmenuface();
	 	  if(head==NULL)
	 	 {
	 	 	printf("����û��ʼ�������޷�ִ�к�����������ѡ�����1��ʼ������\n"); 
		 }
		 else 
		 {
		 i=2;
		 select();
		 if(judge==1)					
		 InsertAfterList_DuL(record,q); 	   //�ڽڵ�֮������µĽڵ� 
		 }
		 break;
		 
		 case 5:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	printf("����û��ʼ�������޷�ִ��ɾ������������ѡ�����1��ʼ������\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("�����Ѿ���ʼ��������û�о������ݵĽڵ㣬���޷�ִ��ɾ������������ͨ��ѡ�����4��ӽڵ㣡\n");
		 	 break;
		 }
		 else 
		 {
		 selectdelete();			//����ѡ��ɾ����һ���ڵ�
		 if(judge!=0) 
 	 	 DeleteList_DuL(record,q1);	//ɾ��ָ���ڵ� 
		 }
 	 	 break;
 	 	 
		 case 6:
		 system("cls");
		 mainmenuface();
		 if(head==NULL)
		 {
		 	 printf("����û��ʼ�������޷�ִ�б�������������ѡ�����1��ʼ������\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("�����Ѿ���ʼ��������û�о������ݵĽڵ㣬���޷�ִ�б�������������ͨ������ѡ����ӽڵ㣡\n");
		 } 
		 else
	 	 TraverseList_DuL(head,print); //��������������нڵ����� 
	 	 break;	 
		  
 	     default :
	   	 printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
	   	 break;
	 }
     }
	 return 0;
}
