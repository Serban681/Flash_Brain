import Head from "next/head";
import Header from "@/components/GeneralComponents/Header";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import config from "@/config";
import styles from '@/styles/index.module.css';
import router from "next/router";
import {useState} from "react";
import {Category} from "@/utils/model/Category";
import {Summary} from "@/utils/model/Summary";
import SummaryCard from "@/components/MainPageComponents/SummaryCard";
import useFetchSummaries from "@/utils/useFetchSummaries";

export function CategoryList(props: any) {

    let categories: Category[] = [
        {categoryName: "all", categoryId: 1},
        {categoryName: "math", categoryId: 2},
        {categoryName: "science", categoryId: 3},
        {categoryName: "history", categoryId: 4},
        {categoryName: "languages", categoryId: 5},
        {categoryName: "comp-sci", categoryId: 6},
        {categoryName: "geography", categoryId: 7},
        {categoryName: "economics", categoryId: 8},
        {categoryName: "other", categoryId: 9}
    ]
    const categoryList:number[] = props.categoryList;
    const setCategoryList = props.setCategoryList;

    function isSelected(categoryId: number): boolean {
        return categoryList.includes(categoryId);
    }
    function selectCategory(categoryId: number) {
        if(!categoryList.includes(categoryId)) {
            if(categoryId === 1) {
                setCategoryList([1]);
            }
            else {
                let newList: number[] = [...categoryList, categoryId];
                newList = newList.filter((id: number) => id !== 1);
                setCategoryList(newList);
            }
        } else {
            let newList: number[] = categoryList.filter((id: number) => id !== categoryId);
            setCategoryList(newList);
        }
    }

    return (
        <div className={styles.categoryElementDiv}>
            {categories.map(category => (
                <div key={category.categoryId} className={isSelected(category.categoryId) ? styles.categoryDivSelected : styles.categoryDiv} onClick={() => selectCategory(category.categoryId)}>
                    #{category.categoryName}
                </div>
            ))}
        </div>
    )

}

export default function Home() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();
    const [activeCategoryList, setActiveCategoryList] = useState<number[]>([]);
    const {error: errorFetchSummaries, isPending: isPendingSummaries, summaryList} = useFetchSummaries();
    // const summaryList: Summary[] = [
    //     {
    //         title: "Introduction to JavaScript",
    //         category_id: 1,
    //         ownerId: 101,
    //         summaryId: 1,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Python Basics",
    //         category_id: 2,
    //         ownerId: 102,
    //         summaryId: 2,
    //         isPublic: false,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "HTML & CSS Fundamentals",
    //         category_id: 1,
    //         ownerId: 103,
    //         summaryId: 3,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Data Structures in Java",
    //         category_id: 3,
    //         ownerId: 104,
    //         summaryId: 4,
    //         isPublic: false,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Machine Learning Basics",
    //         category_id: 4,
    //         ownerId: 105,
    //         summaryId: 5,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Web Development Concepts",
    //         category_id: 1,
    //         ownerId: 106,
    //         summaryId: 6,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Artificial Intelligence Overview",
    //         category_id: 4,
    //         ownerId: 107,
    //         summaryId: 7,
    //         isPublic: false,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Mobile App Development Basics",
    //         category_id: 5,
    //         ownerId: 108,
    //         summaryId: 8,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Network Security Fundamentals",
    //         category_id: 6,
    //         ownerId: 109,
    //         summaryId: 9,
    //         isPublic: false,
    //         flashCard: [],
    //         likes: []
    //     },
    //     {
    //         title: "Algorithms and Complexity",
    //         category_id: 3,
    //         ownerId: 110,
    //         summaryId: 10,
    //         isPublic: true,
    //         flashCard: [],
    //         likes: []
    //     },
    // ]


    function scrollToSection(id: string) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});
        }
    }

    function getSummaryBackground(index: number) {
        switch (index % 6) {
            case 0:
                return 'var(--green)'
            case 1:
                return 'var(--black)'
            case 2:
                return 'var(--yellow)'
            case 3:
                return 'var(--yellow)'
            case 4:
                return 'var(--green)'
            case 5:
                return 'var(--black)'
        }
    }

    function getSummarySecondaryColor(index: number) {
        switch (index % 6) {
            case 0:
                return 'var(--light-green)'
            case 1:
                return 'var(--light-black)'
            case 2:
                return 'var(--light-yellow)'
            case 3:
                return 'var(--light-yellow)'
            case 4:
                return 'var(--light-green)'
            case 5:
                return 'var(--light-black)'
        }
    }


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>

      <>
          <div className={styles.indexOuterDiv}>
              <Header></Header>
              <div className={styles.indexContentDiv}>
                <div className={styles.indexHigherDiv}>
                    <div className={styles.indexHigherDivLeft}>
                        <p className={styles.indexMotto}>Make hard things<br/> easy to understand</p>
                        <div>
                            {!isLoggedIn && <button className="big-btn" onClick={() => router.push('/register')}>Register now</button>}
                            {isLoggedIn && <button className="big-btn" onClick={() => scrollToSection("browseSection")}>Get started</button>}
                        </div>
                    </div>
                    <div className={styles.indexHigherDivRight}>
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                        <div className={styles.circle3}></div>
                    </div>
                </div>
                  <section id="browseSection">
                      <div className={styles.indexLowerDiv}>
                          <form className={styles.indexSearchForm}>
                            <div className={styles.searchBarDiv}>
                                <input type="text" className={styles.searchBarInput}></input>
                                <button className={styles.searchBarButton}>Search</button>
                            </div>
                          </form>
                          <CategoryList categoryList={activeCategoryList} setCategoryList={setActiveCategoryList}></CategoryList>

                          {isPendingSummaries && <div className="lds-dual-ring"></div>}
                          {summaryList.length > 0 && <div className={styles.summaryBrowser}>
                              {summaryList.map((summary, index) => (
                                  <div key={summary.summaryId} style={{borderRadius:10}}>
                                      <SummaryCard
                                          summary={summary}
                                          backgroundColor={getSummaryBackground(index)}
                                          secondaryColor={getSummarySecondaryColor(index)}
                                      ></SummaryCard>
                                  </div>
                              ))}
                          </div>}
                          {summaryList.length == 0 && !isPendingSummaries && <p style={{
                              fontFamily:'var(--font-josefin)',
                              fontSize: 26,
                              color: 'var(--white)',
                              marginTop: 20
                          }}>No results found</p>}
                      </div>
                  </section>
              </div>
          </div>
      </>
    </>
  );
}
