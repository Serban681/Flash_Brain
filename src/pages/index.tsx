import Header from "@/components/GeneralComponents/Header";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import styles from '@/styles/index.module.css';
import router from "next/router";
import {useEffect, useState} from "react";
import {Category} from "@/utils/model/Category";
import SummaryCard from "@/components/MainPageComponents/SummaryCard";
import useFetchSummaries from "@/utils/useFetchSummaries";
import {useSearchParams} from "next/navigation";
import Image from "next/image";

import like_image from "@/images/like_image_icon.svg";

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

    const searchParams = useSearchParams()

    const initialPathValue = searchParams.get('query');

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);
    const [activeCategoryList, setActiveCategoryList] = useState<number[]>([1]);
            
    const searchQuery = searchParams.get('query');

    const [isScrolled, setIsScrolled] = useState(false);

    const [currentSearchedValue, setCurrentSearchedValue] = useState<string | null>(initialPathValue ?? null);
    const [searchValue, setSearchValue] = useState<string>('');

    const {error: errorFetchSummaries, isPending: isPendingSummaries, summaryList} = useFetchSummaries(currentSearchedValue ?? '', activeCategoryList);

    useEffect(() => {
        console.log(isLoggedIn)

        const handleScroll = () => {
          const scrolled = window.scrollY > 0;    
          setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const goToFavourites = () => {
        router.push('/favourites');
    }

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

    function handleSearch(e:any) {
        e.preventDefault();
       if(searchValue) {
           router.push({
                   pathname: '/', query: { query: searchValue }},
           undefined, { shallow: true })
            setCurrentSearchedValue(searchValue);
       }
        else {
            setCurrentSearchedValue('');
           router.push({
                   pathname: '/'},
               undefined, { shallow: true })
       }
    }

    useEffect(() => {
        setSearchValue(currentSearchedValue ?? '');
    }, [currentSearchedValue]);

  return (
    <>
        <div className={`bg-[var(--yellow)] ${styles.mainContainer}`}>
            <Header></Header>
            <div className={`absolute bottom-10 hidden md:block transition-all ease-in ${!isPendingLoggedIn && isLoggedIn && !isScrolled ? 'right-[2rem]' : 'right-[-4rem]'}`}>
                <div onClick={goToFavourites} className={`cursor-pointer w-14 h-14 flex justify-center items-center bg-[#1B262C] rounded-full shadow-default`}>
                    <Image className="w-7 h-7" src={like_image} alt="" />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.centerHero}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroMottoContainer}>
                            <p className={styles.heroMotto}>Make hard things easy to understand</p>
                        </div>
                        <div className={styles.heroIllustration}>
                            <div className={styles.circle1}></div>
                            <div className={styles.circle2}></div>
                            <div className={styles.circle3}></div>
                        </div>
                        <div className={styles.indexBtn}>
                            {!isLoggedIn && <button className="big-btn" onClick={() => router.push('/register')}>Register now</button>}
                            {isLoggedIn && <button className="big-btn" onClick={() => scrollToSection("browseSection")}>Get started</button>}
                        </div>
                    </div>
                </div>
                

                <section id="browseSection" className={styles.browseSection}>
                    <div className={styles.browseSectionContainer}>
                        <form onSubmit={(e) => handleSearch(e)} className={styles.indexSearchForm}>
                            <div className={styles.searchBarDiv}>
                                <input
                                    type="text"
                                    className={styles.searchBarInput}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                ></input>
                                <button className={styles.searchBarButton}>Search</button>
                            </div>
                        </form>
                        <CategoryList
                            categoryList={activeCategoryList}
                            setCategoryList={setActiveCategoryList}
                            searchValue={searchValue}
                        ></CategoryList>
                        <div className="centered-container mb-4">
                            <div className="lds-dual-ring" style={{opacity: isPendingSummaries ? '1' : '0'}}></div>
                        </div>
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
                            textAlign: 'center',
                            marginBottom: '8rem'
                        }}>No results found</p>}
                    </div>
                </section>
            </div>
        </div>
    </>
  );
}
