#include "qgsort.h"
int main()
{
	int options,i,n,k;
	long start,end;
	double times;
	loop:
	system("cls");
	mainmenuface();
	while(1)
	{
		printf("����������Ҫ�����ı�Ž��в�����\n"); 
		while(checkout(&options)==0)
		{
			printf("�����������������:\n");
		}
	switch(options)
	{
		case 1:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	start = clock();
			insertSort(a,n);//�������� 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break; 
			}
				
		case 2:
			{
			system("cls");
			mainmenuface();		
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	int temp[n];
			start = clock(); 		 	
			MergeSort(a,0,n-1,temp);//�鲢���� 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}
		
		case 3:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	start = clock();
			QuickSort_Recursion(a,0,n-1);//�������򣨵ݹ飩 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}	
			
		case 4:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	start = clock();
			QuickSort(a,n);//�������򣨷ǵݹ飩
			end = clock();
			print(a,n); 
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}
				
		case 5:
			{
			system("cls");
			mainmenuface();	
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	start = clock();
			CountSort(a,n,1000);//�������� 
			end = clock();	
			print(a,n);	
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}	
			
		case 6:
			{
			system("cls");
			mainmenuface();	
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	start = clock();
			RadixCountSort(a,n);//�������� 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;	
			}
				
		case 7:
			{
			system("cls");
			mainmenuface();
			printf("��������������������������\n");
	        while(checkout(&n)==0)
			{
				printf("�����������������:\n");
			}
			int a[n];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			for(i=0;i<n;i++)
			{
				printf("%d ",a[i]);
			}
			printf("\n");
			start = clock();	
			ColorSort(a,n);//��ɫ���� 	
			end = clock();
			print(a,n);
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}
					
		case 8:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
 			
		 	printf("��������Ҫ���ҵڼ����ֵ\n");
		 	while(checkout(&k)==0||k>n||k<=0)
			{
				printf("�����������������:\n");
			}
		 	k=n-k+1;
		 	start = clock();
			GetReasult(a,0,n-1,k);//���ҵ�k���ֵ 
			end = clock();
			printf("��Ҫ�ҵ�ֵΪ%d\n",a[k-1]);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}
					
		case 9:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("�ļ���ȡʧ�ܣ�\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("�ļ��е������ѳɹ����뵽�����в�׼������\n");
		 	printf("��������Ҫ���ҵڼ�С��ֵ\n");
		 	while(checkout(&k)==0||k>n||k<=0)
			{
				printf("�����������������:\n");//������ 
			}
		 	start = clock();
			GetReasult(a,0,n-1,k);//���ҵ�kС��ֵ
			end = clock();
			printf("��Ҫ�ҵ�ֵΪ%d\n",a[k-1]);
			free(a);
			a=NULL;
			printf("����������ʱ��\n");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break; 
			}		
		
		case 10:
		{
		system("cls");
		mainmenuface2();
		while(1)
		{
		printf("����������Ҫ�����ı�Ž��в�����\n"); 
		while(checkout(&options)==0)
		{
			printf("�����������������:\n");
		}
		switch(options)
		{
		case 1:
		{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
			insertSort(a,10000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			insertSort(a,50000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			insertSort(a,200000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 
			}
				
		case 2:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
		 	int temp1[10000];
			MergeSort(a,0,9999,temp1);//�鲢����
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			int temp2[50000];
			MergeSort(a,0,49999,temp2);//�鲢����
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			int temp3[200000];
			MergeSort(a,0,199999,temp3);//�鲢���� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 
			}
		
		case 3:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
		 	QuickSort_Recursion(a,0,9999);//�������򣨵ݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			QuickSort_Recursion(a,0,49999);//�������򣨵ݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			QuickSort_Recursion(a,0,199999);//�������򣨵ݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 
			}	
			
		case 4:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
		 	QuickSort(a,10000);//�������򣨷ǵݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			QuickSort(a,50000);//�������򣨷ǵݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			QuickSort(a,200000);//�������򣨷ǵݹ飩
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 
			}
				
		case 5:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
		 	CountSort(a,10000,1000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			CountSort(a,50000,1000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			CountSort(a,200000,1000);//�������� 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 
			}	
			
		case 6:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("����Ϊ10000������£�����ʱ��Ϊ��");
		 	start = clock();
		 	RadixCountSort(a,10000);//��������  
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce50k(); 
		 	printf("����Ϊ50000������£�����ʱ��Ϊ��");
		 	start = clock();
			RadixCountSort(a,50000);//��������  
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			a=produce200k(); 
		 	printf("����Ϊ200000������£�����ʱ��Ϊ��");
		 	start = clock();
			RadixCountSort(a,200000);//��������
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//��λ������
			free(a);
			break; 	
			}
				
		case 7:
			{
			system("cls");
			mainmenuface2();
			n=10000;
			int a[10000];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			start = clock();	
			ColorSort(a,10000);//��ɫ���� 	
			end = clock();
			printf("����Ϊ10000������£�����ʱ��Ϊ��");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			n=50000;
			int a1[50000];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			start = clock();	
			ColorSort(a1,50000);//��ɫ���� 	
			end = clock();
			printf("����Ϊ50000������£�����ʱ��Ϊ��");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			n=200000;
			int a2[200000];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			start = clock();	
			ColorSort(a2,200000);//��ɫ���� 	
			end = clock();
			printf("����Ϊ200000������£�����ʱ��Ϊ��");
			times=end-start;
			printf("%.2fms\n",times);//��λ������
			break;
			}
			
			case 8:
			goto loop;
				
		default:
			printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
			
		}
		}
		}
		
		case 11:
			{
			printf("���ɵ��������ΧΪ0��1000\n");
			int i=0,j=100000,k;
			int *b;
		 	b=produce100();
		 	int *a=(int *)malloc(100*sizeof(int));
		 	start = clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			insertSort(a,100);//�������� 
			}
			end = clock();
			times=end-start;
			printf("�������򻨷ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			
			start=clock();
			for(i=0;i<j;i++)
			{
			int temp[100]; 
			memcpy(a,b,100*sizeof(int));
			MergeSort(a,0,99,temp);//�鲢����
			}
			end = clock();
			times=end-start;
			printf("�鲢���򻨷ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			QuickSort_Recursion(a,0,99);//�������򣨵ݹ飩
			}
			end = clock();
			times=end-start;
			printf("��������(�ݹ�)���ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			QuickSort(a,100);//�������򣨷ǵݹ飩
			}
			end = clock();
			times=end-start;
			printf("��������(�ǵݹ�)���ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			CountSort(a,100,1000);//��������
			}
			end = clock();
			times=end-start;
			printf("�������򻨷ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			RadixCountSort(a,100);//�������� 
			}
			end = clock();
			times=end-start;
			printf("�������򻨷ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			 
			for(i=0;i<100;i++)
			{
			 	b[i]=rand()%3;				
		 	} 
		 	start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			ColorSort(a,100);//��ɫ���� 
			}
			end = clock();
			times=end-start;
			printf("��ɫ���򻨷ѵ�ʱ��Ϊ��");
			printf("%.2fms\n",times);//��λ������
			free(a);
			free(b);
			a=NULL;
			b=NULL;
			break;
			}

			default:
			printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
	}
}
	return 0;
}


