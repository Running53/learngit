#include "duLinkedList.h"
extern DuLinkedList head;
extern DuLinkedList record;		//用于插入时记录想要插入结点的地址 
extern DuLinkedList q;			//用来指向要插入的结点
extern int i;
extern int judge;
int main()
{
	mainmenuface();
	ElemType *q1;
 	ElemType options;
    while (1){
 	loop:
	printf("-------------------请选择您的操作编号：----------------------\n");
    while(inputCheck(&options))
    {
    	printf("输入有误！请重新输入：\n");
	}
	 switch(options)
	 {
 		 case 1:
 		 system("cls");
	 	 mainmenuface();
		 InitList_DuL(&head); 		//初始化链表 
		 goto loop;
		 break;
		 
		 case 2:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	 printf("您的链表还没有初始化或已被销毁,故无法执行销毁操作！可以选择操作1初始化链表\n"); 
		 } 
		 else
 	 	 DestroyList_DuL(&head); //销毁链表 
 	 	 break; 
 	 	 
		 case 3:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	printf("链表还没初始化！故无法执行前插操作，可以选择操作1初始化链表\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("链表已经初始化，但并没有具有数据的节点，故无法执行前插操作，可以通过选择操作4添加节点！\n");
		 }
		 else
		 {
		 i=1;
		 select();	
		 if(judge==1)
		 InsertBeforeList_DuL(record, q); 	   //在节点之前插入新的节点 
		 }
		 break;
		 
		 case 4:
		 system("cls");
	 	 mainmenuface();
	 	  if(head==NULL)
	 	 {
	 	 	printf("链表还没初始化！故无法执行后插操作，可以选择操作1初始化链表\n"); 
		 }
		 else 
		 {
		 i=2;
		 select();
		 if(judge==1)					
		 InsertAfterList_DuL(record,q); 	   //在节点之后插入新的节点 
		 }
		 break;
		 
		 case 5:
		 system("cls");
	 	 mainmenuface();
	 	 if(head==NULL)
	 	 {
	 	 	printf("链表还没初始化！故无法执行删除操作，可以选择操作1初始化链表\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("链表已经初始化，但并没有具有数据的节点，故无法执行删除操作，可以通过选择操作4添加节点！\n");
		 	 break;
		 }
		 else 
		 {
		 selectdelete();			//用于选择删除哪一个节点
		 if(judge!=0) 
 	 	 DeleteList_DuL(record,q1);	//删除指定节点 
		 }
 	 	 break;
 	 	 
		 case 6:
		 system("cls");
		 mainmenuface();
		 if(head==NULL)
		 {
		 	 printf("链表还没初始化！故无法执行遍历操作，可以选择操作1初始化链表\n"); 
		 }
		 else if(head!=0&&head->next==NULL)
		 {
		 	 printf("链表已经初始化，但并没有具有数据的节点，故无法执行遍历操作，可以通过插入选择添加节点！\n");
		 } 
		 else
	 	 TraverseList_DuL(head,print); //遍历输出链表所有节点数据 
	 	 break;	 
		  
 	     default :
	   	 printf("您输入的数字不在有效范围内，请重新输入：\n");
	   	 break;
	 }
     }
	 return 0;
}
