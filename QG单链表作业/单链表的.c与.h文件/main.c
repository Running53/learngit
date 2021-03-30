#include "linkedList.h"
extern LinkedList record;		//用于插入时记录想要插入结点的地址 
extern LinkedList head;
extern LinkedList q;			//用来指向要插入的结点 
extern int judge;
int main()
{
	mainmenuface();
	ElemType *q1=NULL;
	ElemType i;  			//用来查询节点是否存在的变量 
 	int options;
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
  		 system("cls");			//清空屏幕 
 	 	 mainmenuface();		
		 InitList(&head); 		//初始化链表 
		 goto loop;
		 break;
		 
		 case 2:
		 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,可以选择操作1初始化链表\n"); 
 		 else
 		 {
 		 select1();			//融合了选择节点和插入节点的函数 	  	 			 
	  	 }	 	
		 break;
		 
		 case 3:
		 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,可以选择操作1初始化链表\n"); 
 		 else if(head->next==NULL)
 		 printf("您的链表已经初始化但还未添加数据,故无法执行遍历操作！可以选择操作2为链表添加数据\n"); 
	 	 else 
	  	 TraverseList(head,print); //遍历输出链表 
	 	 break;
	 	 
	 	 case 4:
	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行逆序操作！可以选择操作1初始化链表\n");
 		 else 
 	 	 ReverseList(&head);  //使链表逆序 
 	 	 break;
 	 	 
 	 	 case 5:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行此操作！可以选择操作1初始化链表\n");
 		 else if(head->next==NULL)
 		 printf("您的链表不可以查找中间节点！请添加数据！\n");
 		 else
 	 	 FindMidNode(&head);	//查找中间节点 
 	 	 break;
 	 	 
 	 	 case 6:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行删除操作！可以选择操作1初始化链表\n");
 		 else 
 		 {
 		 if(head->next->next==NULL)
 		 printf("链表中只有一个结点有数据，无法根据上一个节点数据进行删除！\n");
 		 else
 		 {
	  	 select2();
	  	 if(judge!=0)
 	 	 DeleteList(record,q1);	//删除指定节点 
		 }	 	 
	  	 }
 	 	 break;
 	 	 
 	 	 case 7:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 int number;
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行查询操作！可以选择操作1初始化链表\n"); 
 		 else
		 {
 	     printf("请输入您要查询的数据：\n")	;
 	 	 while(inputCheck(&number))
   		 {
    	 printf("输入有误！请重新输入：\n");
	     } 
	  	 if(judge!=0)								   
 	 	 SearchList(head,i);	//查询节点是否存在
		 }	 
 	 	 break;
 	 	 
 	 	 case 8:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
	     IsLoopList(head); //判断链表是否成环 
 	 	 break;	
 	 	 
 	 	 case 9:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行销毁操作！可以选择操作1初始化链表\n"); 
 		 else
 	 	 DestroyList(&head); //销毁链表 
 	 	 break; 
 	 	 
 	 	 case 10:
 	 	 system("cls");			//清空屏幕 
 	 	 mainmenuface();
 	 	 if(head==NULL)
 		 printf("您的链表还没有初始化或已被销毁,故无法执行此操作！可以选择操作1初始化链表\n"); 
 		 else
 	 	 ReverseEvenList(&head); //奇偶节点交换 
 	 	 break; 
 	 	 
 	  	 default:
 	  	 printf("您输入的数字不在有效范围内，请重新输入：\n");
	 }
     }    
	 return 0;
}
