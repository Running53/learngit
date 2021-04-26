#include"BinarySortTree.h"
BinarySortTreePtr T;//定义树的节点 
LQueue Q;//定义队列起始节点 
int main()
{
    LinkStack s;
    int ret,t,choose = 0;
    int isprime = 0;
    char c;
    ElemType *e,data,*length;
	int rett,*i;
    int num,key;
    NodePtr* N;
    NodePtr node,p;

do{

   	mainmenuface();
    printf("请选择0-12其中一个数字,并用回车键确认：\n");
		ret = scanf("%d",&choose);
		if(ret<1){									//防止脸滚键盘
			isprime = 1;
			while((c = getchar())!=EOF&&c!='\n');    //获取缓冲字符 直到满足c的条件
			}
		else if(ret == 1 &&(c = getchar())!=EOF&&c!='\n'){      //防止输入1a   1[[    1'.‘；。';  等数字后面带字符的输入
			while((c = getchar())!=EOF&&c!='\n');
			isprime = 1;
		}
		else if (ret == 1 && choose != 0){					//正确输入
    switch(choose)
	{
		case 1:
			system("cls");
            node = create_BSTree();// 初始并创建二叉树 
            draw(node);
//            inorderR_BST(node);
			break;
		case 2:
			system("cls");
			draw(node);
		    printf("请输入你要插入的数据：");//插入节点 
		    scanf("%d",&key);
            InserBST(&node,key);
            draw(node);
            printf("插入成功！");
            getchar();
			break;
		case 3:
			system("cls");
			draw(node);
		    printf("请输入你要删除的数据：");//删除节点 
		    scanf("%d",&key);
            delete_BST(&node,key);
            draw(node);
            getchar();
			break;
		case 4:
			system("cls");
            printf("请输入你要查找的数据：");//查找节点 
            scanf("%d",&key);
            if(SearchBST(node,key,NULL,&p))
                printf("%d在二叉树中！",key);
            else{
                printf("%d不在二叉树中！",key);
            }
            printf("\n");
            getch();
			break;
		case 5:
			draw(node);
		    printf("前序遍历(非递归)结果如下：");//前序遍历 （非递归） 
            preorderTraverse(node);
			break;
		case 6:
			draw(node);
		    printf("前序遍历(递归)结果如下：");//前序遍历（递归） 
            preorderR_BST(node);
			break;
		case 7:
			draw(node);
		    printf("中序遍历(非递归)结果如下：");//中序遍历（非递归） 
            InorderTraverse(node);
			break;
		case 8:
			draw(node);
		    printf("中序遍历(递归)结果如下：");//中序遍历（递归） 
            inorderR_BST(node);
			break;
		case 9:
			draw(node);
		    printf("后序遍历(非递归)结果如下：");//后续遍历（非递归） 
            postorderTraverse(node);
			break;
        case 10:
        	draw(node);
            printf("后序遍历(递归)结果如下：");//后续遍历（递归） 
            postorderR_BST(node);
			break;
        case 11:
            printf("层序遍历结果如下：");//层序遍历 
            levelOrder_BST(node);
            break;
        case 12:
            draw(node);//展示结构 
            break;
		default:
			printf("输入错误！请输入0-12其中一个数字！\n"); 				//防止输入不在0-10范围内的数字
			isprime = 1;
		}
//            printf("\n请点击回车键清空屏幕\n");
//					getchar();
//					system("cls");
		}
		else if(choose==0){
			break;
		}
		if(isprime == 1){						//防止输入大于10或者小于0的整数
			printf("请重新输入正确的数字（不能带字母符号等）\n");
			printf("\n请点击回车键清空屏幕\n");
			isprime = 0;
			getchar();
			system("cls");
		}
		}while(1);
		printf("已退出程序！\n");
    return 0;
}
