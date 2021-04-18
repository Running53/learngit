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
		printf("请输入您想要操作的编号进行操作：\n"); 
		while(checkout(&options)==0)
		{
			printf("输入错误！请重新输入:\n");
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
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	start = clock();
			insertSort(a,n);//插入排序 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break; 
			}
				
		case 2:
			{
			system("cls");
			mainmenuface();		
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	int temp[n];
			start = clock(); 		 	
			MergeSort(a,0,n-1,temp);//归并排序 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}
		
		case 3:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	start = clock();
			QuickSort_Recursion(a,0,n-1);//快速排序（递归） 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}	
			
		case 4:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	start = clock();
			QuickSort(a,n);//快速排序（非递归）
			end = clock();
			print(a,n); 
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}
				
		case 5:
			{
			system("cls");
			mainmenuface();	
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	start = clock();
			CountSort(a,n,1000);//计数排序 
			end = clock();	
			print(a,n);	
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}	
			
		case 6:
			{
			system("cls");
			mainmenuface();	
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	start = clock();
			RadixCountSort(a,n);//基数排序 
			end = clock();
			print(a,n);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;	
			}
				
		case 7:
			{
			system("cls");
			mainmenuface();
			printf("请输入您想产生的随机数个数：\n");
	        while(checkout(&n)==0)
			{
				printf("输入错误！请重新输入:\n");
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
			ColorSort(a,n);//颜色排序 	
			end = clock();
			print(a,n);
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}
					
		case 8:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
 			
		 	printf("请输入您要查找第几大的值\n");
		 	while(checkout(&k)==0||k>n||k<=0)
			{
				printf("输入错误！请重新输入:\n");
			}
		 	k=n-k+1;
		 	start = clock();
			GetReasult(a,0,n-1,k);//查找第k大的值 
			end = clock();
			printf("您要找的值为%d\n",a[k-1]);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}
					
		case 9:
			{
			system("cls");
			mainmenuface();
			FILE *fp=fopen("data.txt","r");
			if(fp==NULL)
			{
				printf("文件读取失败！\n");
				return -1;
			}
		 	produce(&n); 
		 	int *a=(int *)malloc(n*sizeof(int));
		 	for(i=0;i<n;i++)
		 	{
			    fscanf(fp,"%d",&a[i]);
			}
			fclose(fp);
			printf("文件中的数据已成功读入到数组中并准备排序！\n");
		 	printf("请输入您要查找第几小的值\n");
		 	while(checkout(&k)==0||k>n||k<=0)
			{
				printf("输入错误！请重新输入:\n");//输入检测 
			}
		 	start = clock();
			GetReasult(a,0,n-1,k);//查找第k小的值
			end = clock();
			printf("您要找的值为%d\n",a[k-1]);
			free(a);
			a=NULL;
			printf("本次排序用时：\n");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break; 
			}		
		
		case 10:
		{
		system("cls");
		mainmenuface2();
		while(1)
		{
		printf("请输入您想要操作的编号进行操作：\n"); 
		while(checkout(&options)==0)
		{
			printf("输入错误！请重新输入:\n");
		}
		switch(options)
		{
		case 1:
		{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
			insertSort(a,10000);//插入排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			insertSort(a,50000);//插入排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			insertSort(a,200000);//插入排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			break; 
			}
				
		case 2:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
		 	int temp1[10000];
			MergeSort(a,0,9999,temp1);//归并排序
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			int temp2[50000];
			MergeSort(a,0,49999,temp2);//归并排序
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			int temp3[200000];
			MergeSort(a,0,199999,temp3);//归并排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			break; 
			}
		
		case 3:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
		 	QuickSort_Recursion(a,0,9999);//快速排序（递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			QuickSort_Recursion(a,0,49999);//快速排序（递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			QuickSort_Recursion(a,0,199999);//快速排序（递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			break; 
			}	
			
		case 4:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
		 	QuickSort(a,10000);//快速排序（非递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			QuickSort(a,50000);//快速排序（非递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			QuickSort(a,200000);//快速排序（非递归）
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			break; 
			}
				
		case 5:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
		 	CountSort(a,10000,1000);//计数排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			CountSort(a,50000,1000);//计数排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			CountSort(a,200000,1000);//计数排序 
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			break; 
			}	
			
		case 6:
			{
			system("cls");
			mainmenuface2();
			int *a;
		 	a=produce10k(); 
		 	printf("数据为10000的情况下，排序时间为：");
		 	start = clock();
		 	RadixCountSort(a,10000);//基数排序  
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce50k(); 
		 	printf("数据为50000的情况下，排序时间为：");
		 	start = clock();
			RadixCountSort(a,50000);//基数排序  
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
			free(a);
			a=produce200k(); 
		 	printf("数据为200000的情况下，排序时间为：");
		 	start = clock();
			RadixCountSort(a,200000);//基数排序
			end = clock();
			times=end-start;
			printf(" %.2fms\n",times);//单位：毫秒
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
			ColorSort(a,10000);//颜色排序 	
			end = clock();
			printf("数据为10000的情况下，排序时间为：");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			n=50000;
			int a1[50000];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			start = clock();	
			ColorSort(a1,50000);//颜色排序 	
			end = clock();
			printf("数据为50000的情况下，排序时间为：");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			n=200000;
			int a2[200000];	
			srand(time(0));
			for(i=0;i<n;i++)
			{
			 	a[i]=rand()%3;				
		 	} 
			start = clock();	
			ColorSort(a2,200000);//颜色排序 	
			end = clock();
			printf("数据为200000的情况下，排序时间为：");
			times=end-start;
			printf("%.2fms\n",times);//单位：毫秒
			break;
			}
			
			case 8:
			goto loop;
				
		default:
			printf("您输入的数字不在有效范围内！请重新输入：\n");
			
		}
		}
		}
		
		case 11:
			{
			printf("生成的随机数范围为0到1000\n");
			int i=0,j=100000,k;
			int *b;
		 	b=produce100();
		 	int *a=(int *)malloc(100*sizeof(int));
		 	start = clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			insertSort(a,100);//插入排序 
			}
			end = clock();
			times=end-start;
			printf("插入排序花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			
			start=clock();
			for(i=0;i<j;i++)
			{
			int temp[100]; 
			memcpy(a,b,100*sizeof(int));
			MergeSort(a,0,99,temp);//归并排序
			}
			end = clock();
			times=end-start;
			printf("归并排序花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			QuickSort_Recursion(a,0,99);//快速排序（递归）
			}
			end = clock();
			times=end-start;
			printf("快速排序(递归)花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			QuickSort(a,100);//快速排序（非递归）
			}
			end = clock();
			times=end-start;
			printf("快速排序(非递归)花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			CountSort(a,100,1000);//计数排序
			}
			end = clock();
			times=end-start;
			printf("计数排序花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			
			start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			RadixCountSort(a,100);//基数排序 
			}
			end = clock();
			times=end-start;
			printf("基数排序花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			 
			for(i=0;i<100;i++)
			{
			 	b[i]=rand()%3;				
		 	} 
		 	start=clock();
			for(i=0;i<j;i++)
			{
			memcpy(a,b,100*sizeof(int));
			ColorSort(a,100);//颜色排序 
			}
			end = clock();
			times=end-start;
			printf("颜色排序花费的时间为：");
			printf("%.2fms\n",times);//单位：毫秒
			free(a);
			free(b);
			a=NULL;
			b=NULL;
			break;
			}

			default:
			printf("您输入的数字不在有效范围内！请重新输入：\n");
	}
}
	return 0;
}


