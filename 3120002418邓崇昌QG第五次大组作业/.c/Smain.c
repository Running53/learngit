#include"BinarySortTree.h"
BinarySortTreePtr T;//�������Ľڵ� 
LQueue Q;//���������ʼ�ڵ� 
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
    printf("��ѡ��0-12����һ������,���ûس���ȷ�ϣ�\n");
		ret = scanf("%d",&choose);
		if(ret<1){									//��ֹ��������
			isprime = 1;
			while((c = getchar())!=EOF&&c!='\n');    //��ȡ�����ַ� ֱ������c������
			}
		else if(ret == 1 &&(c = getchar())!=EOF&&c!='\n'){      //��ֹ����1a   1[[    1'.������';  �����ֺ�����ַ�������
			while((c = getchar())!=EOF&&c!='\n');
			isprime = 1;
		}
		else if (ret == 1 && choose != 0){					//��ȷ����
    switch(choose)
	{
		case 1:
			system("cls");
            node = create_BSTree();// ��ʼ������������ 
            draw(node);
//            inorderR_BST(node);
			break;
		case 2:
			system("cls");
			draw(node);
		    printf("��������Ҫ��������ݣ�");//����ڵ� 
		    scanf("%d",&key);
            InserBST(&node,key);
            draw(node);
            printf("����ɹ���");
            getchar();
			break;
		case 3:
			system("cls");
			draw(node);
		    printf("��������Ҫɾ�������ݣ�");//ɾ���ڵ� 
		    scanf("%d",&key);
            delete_BST(&node,key);
            draw(node);
            getchar();
			break;
		case 4:
			system("cls");
            printf("��������Ҫ���ҵ����ݣ�");//���ҽڵ� 
            scanf("%d",&key);
            if(SearchBST(node,key,NULL,&p))
                printf("%d�ڶ������У�",key);
            else{
                printf("%d���ڶ������У�",key);
            }
            printf("\n");
            getch();
			break;
		case 5:
			draw(node);
		    printf("ǰ�����(�ǵݹ�)������£�");//ǰ����� ���ǵݹ飩 
            preorderTraverse(node);
			break;
		case 6:
			draw(node);
		    printf("ǰ�����(�ݹ�)������£�");//ǰ��������ݹ飩 
            preorderR_BST(node);
			break;
		case 7:
			draw(node);
		    printf("�������(�ǵݹ�)������£�");//����������ǵݹ飩 
            InorderTraverse(node);
			break;
		case 8:
			draw(node);
		    printf("�������(�ݹ�)������£�");//����������ݹ飩 
            inorderR_BST(node);
			break;
		case 9:
			draw(node);
		    printf("�������(�ǵݹ�)������£�");//�����������ǵݹ飩 
            postorderTraverse(node);
			break;
        case 10:
        	draw(node);
            printf("�������(�ݹ�)������£�");//�����������ݹ飩 
            postorderR_BST(node);
			break;
        case 11:
            printf("�������������£�");//������� 
            levelOrder_BST(node);
            break;
        case 12:
            draw(node);//չʾ�ṹ 
            break;
		default:
			printf("�������������0-12����һ�����֣�\n"); 				//��ֹ���벻��0-10��Χ�ڵ�����
			isprime = 1;
		}
//            printf("\n�����س��������Ļ\n");
//					getchar();
//					system("cls");
		}
		else if(choose==0){
			break;
		}
		if(isprime == 1){						//��ֹ�������10����С��0������
			printf("������������ȷ�����֣����ܴ���ĸ���ŵȣ�\n");
			printf("\n�����س��������Ļ\n");
			isprime = 0;
			getchar();
			system("cls");
		}
		}while(1);
		printf("���˳�����\n");
    return 0;
}
