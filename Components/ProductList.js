import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Row, {Separator} from './Row';

import ProductListItem from './SubComponents/ProductListItem';

export default class ProductList extends React.Component {
    //Sætter products til at være et state så vi kan give den værdier
    state = {
        products: {}
    };

    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {
        firebase
            .database()
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({products: snapshot.val()});
            });
    }


    //Vi opretter en metode der navigere os til det
    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', {id});
    };

    render() {
        const {products} = this.state;
        const image = {uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PBhASEA8VEhUSFhYSDxUVEBUQFhYPFRcWGBYXFRcYICggGBoxGxcXITEtMSkrLzM6Fx8zODMvOCkvOisBCgoKDg0OGxAQGzYlHiIvMTUrLTY3LS0rLS03Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOAA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEEBQcIAwL/xABMEAACAQMBBAQEEwUGBwEAAAAAAQIDBBEFBgcSIRMxQXEIUXOBFBUXIjIzNlNUYXKRk5ShsbLD0RY1dLPCN0JSYpLBJCc0Q4KD0iP/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EADARAQABAwEECgICAgMAAAAAAAABAgMEBRESFVIUITEyMzRBUXGBBhMiI2GRJDVC/9oADAMBAAIRAxEAPwDRoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvtK0qtd3ap0IOcsZayklFdbbfJI8XLtFqnernZDZbt1XJ2Us/6nWpe9w+liQeK4vMkdAvex6nWpe9w+miOK4vMzw+97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97Hqdal73D6aI4ri8x0C97K+p1qXvcPpojiuLzHD73stNS2Jv7e0lUnRThFZm4zjNxj42lzwbbWfYu1btFXW114l2iNswjr6yYjKAAJdsZu8vtXsqlW1lSUac+jl0lSUHxYT5Yi+WGBIfUM1j/HbfTT/+APOruQ1mMeXoeXxRrtN/6ooCD69s/d6fedFd0JUZ9aUsNSXjjJZUl3MDGAAAAAAAAAAADZG52K6a8eOfDSXmbnn7l8xQ6/P9NPyttKj+dTZU6kY9bS8WWkctTarr7sbV1VXTT2yrGaa5NPueTFduqidlUM01RV1w+jwyAAAADzdaCeHJJ+LiRujGuzG2KXiblMer0NUxMPcTtDA8rmKdtNPmnGSfdhknEmYvUzHu13o20TDnBn0JyKgADoTwbfc1efxC/lxAu95e9OvpG0atqdrTqxdKFXilOUXmTmscvkgY3ZbfmrjV6VG7tFRjUkoKpCq5KM5PEeKLXscvm88gJrvX2fp3+xVypRzOhCVehLlmNSmnJpPxNJxfeByaBnLDY/U7ijx0bC4nF81JUJ8LXxNrDAsNT0m5taijc29SjJ9SqU5U2+7iXMC0pwcpqMU228JJZbb6kl2sC+utDvKNBzq2lenBYzKdCpCKy8LLawubS84F5HZDU3ZdMtPuHT6+L0PPGPH1Zx8YGOstNuK85KjQqVXH2Sp05VGu9RXID7lo10ryNF21ZVZLijTdGam4+NRxlrk/mAyVbYjVoW/HLTblR62+gm8L40llAYCUWnhrGOT7wNkbnfbLzuo/mFDr/hU/K20nvVfSu+L2dn3VfyxoHh1M6r2wz+7D3JQ+XU/EV+ux/wAj6StMn+lLCjmmY9FjthQxsAbDaqBR9RmIliZaN2xjnbO5Xjq4+fB9AxfLU/DmL8/3z8t5I4W9EzXMx7ukt92A07Gx8V/aZfJf3G/G8Wn5eLndlzez6G5CVAAHQng2+5q8/iF/LiBab393up6ntZGvaUYzpqjCm3KrCHr4ym3ybz/eQGE2R3Kah6c0Z3rp0qVOcZzUanSTlwtPhXDyWcdeQNvbytYp2WxF5UnJJypTpUk/71WqnCKS7evPcmBrvcbu/ovTo6jd01UlNv0JGSzGEIvHSNPrk2njxJZ7eQSTazfBp+n6rK3VOpcTpvhrdG4xhCXbHik/XSXbjl2ZAzWi6xpm0ez08U1Vp+xrUqsVx054ys+J9qkn2cnyA0HtFsnLSN5FvQy5U5VqNW2k+t0ZVEkn/mTTT7s9oHUGoUKM7V9PGMoRaqPjScU6bU1J55cmk/MBrXUN92l+hrmNDpekhCfoeUqWKdSqk+BLDcks460gIx4N03LWNRcnlunTbb5ttzm22Bszbraux0aj6JrUuOtWSpU1BRVSpGGZYcn1QTm3/wCfVzAx+7vedQ1m8qUeglQqwj0ii5qpGVNNJtSSWGm1yx2gQDwitnqNG9trylBQlX46dfCxxTik4zf+bDafcgMFuc9svO6j+YUOv+DT8rbSu9Ub4vbLPuq/lj8f8Or6NU71KP7PV9UuLH0NZSkoQblLgap4cnn11R/YslnkdHonfuodn91UbttS6vdW03UEqtarGWMpSqOrCUc/G2mhTRjZNH8YiYJuXrFXXLYktdlcbBVbqH/5z6KeeF44asMp8PnWV3nPU4dNnPi3PYtpyZrxprjtRrdrrl3ca/KFa4nUj0UpJSllcSlBZ+1ljrGPboxpmmnZO1E0+9XVd2TKdbS1pU9nrqcJOMoUpyi1yaklyaOe02mKsmmJ7Frl1TTZqmED3ca5d3G0LhWuJ1I9FOWJSyuJOOH9p0eq41qjHmaadipwb9yq7sqnqRvbKo47Y3Ml1qrld6wyww4249Pwh5M7L1Ux7srTpa7qNHp4zq8Dy4YqqhF/IjlZRorrw7E7s7NrbTTkXY2x2PLRdsb6x1Do7mU6kIy4asKnOcfHwyfNP7GMjT7GRb20x1+kwzZzLlqrZU270sZ2fHB5jKHFF+OLWU/mORotzayIon0lfTXvW9sOcmd85NQAB0J4NvuavP4hfy4gZPeJvVej6+rZWSr5pxq8fojovZOSxjgf+Hx9oETreEDVcPWabBPs4rmUl8ygvvA1vthtpfatdKV1UXDHPRUoLhpwz14XW38bbYHUexcYx2KsOj6vQtDh7f8AtRA4/u6k5XU5VM8cpSc89fG23LPnyBtvwbZz9P72K9g6EXLxcaqLh+xzAzu/OMf2r0F9rrST+Sqtvj7WwNgbyazhsDqLTx/w9SP+pcP+4HIT6wNzeDT+9NQ8nS/FID58JWb9OLBdipVGu9zWfuQGE8H5/wDMFeQq/wBIE38JP9wWXl5fgYEH3Oe2XndR/MKDX/Bp+VtpXeqN8Ptln3VfvgZ/H/Dr+jVO9Szm6yjGOyyklznUm5ebCX2Ig69XP7op/wAJOmUx+raw2+Jf9G/Kr+WS/wAfn+FcNGq9tKuzv9lV1/7vuibsj/saHmz5Or7YjdN7pp+Qn+Kmbtb8rPy06b4302Rtb7l7zyNT8LOa0rzVHyuM3wKmtd1PuofkZ/fA6jV/LT8qXT/G+mJ2391t35T/AGRJw/L0/DTk+NV8t421KMLeEYrEYxUYpdkUsI4jKrqqu1TPu6SzTEURsao3sUYx2khJLnOlFy+OSlKOX5kvmOr0a5NWP1+kqTUaYi71J3sXUcti7dv3uUfNFyS+xIpc+nZn9XvCwxfLtGs69zygADoTwbfc1efxC/lxAhXhDe72H8NT/HUA1gAA6R3GbZUrrZ6FlUmlXtlwwi3h1LdexcfG0vWtfEn2gWG2e5KN3rNS4s7mNFVZOdSnODlFTlzk4OPNJvnjHb1gS7YPYy10DRqrdZSlL19zXmlTjwwTwlz9bBZb6+1+YNK7Z7XR1beVazpZ6CjWo0rfPLiiqqcqmOzL+xRA3lvU/s81DyL+9AckPrA3N4NP701DydL8UgPPwlP37Y+Rn+MDC+D/AP2gryFX+kCc+En+4LLy8vwMCDbnPbLzuo/mFDr/AIVPyttK79Su+L2yz7qv9Bj8f8Or6Z1TvQz+7D3JU/l1PxFfr3mPpK0zwftg98fsbPvq/lk38f7laPqvbS9tkLeVXdnc04rMpdOorxy4U0jZmXIt59Ey841M1YtUQhuxOtQsdejVqJuDi6c8LLSlh5x280izzsbpFmaIQcW9Fq5FUpdtltzbVtGnQtXKpKquGUuCUIxhyz7Lm32FVp2k12bv7K57E/LzqK6Jpo9WF3U+6h+Rn98Cdq/lp+UXT/G+mI2491l35R/ciRheXo+GjK8apOtB3i2vpXBXLnCpCKjJqDmp4WE011PvKbL0Suu7NVE9UrLH1GmmjZV2oPtLqs9T2g46dN+u4aVCHXLhT5Z+Ntt+cusazTi2d2Z7O1X3rk37m3/TcelWHobQKdHrdOlwt+OWPXNefJyN69F3M34919ao3LG7/hz6zt3MT2qAAM9s/thqOnW8qdndSoxnLjmlGEsyxjPrk+xICz17Xbq/vVWu6zq1FFQUmoxfAm2liKS7X84GNAAelCtKnVjKEnGUXmMotxaa6mmuaYE00/e1rlGjwq86RLkulpU6j/1NZfnbAw+0W2upajDhu7udSGc9GsU6eezMIJJvvyBg7evKncRnB4lBqUH4pReU/nQEl1LeHrFzY1KNe9lOnUXDUi4U0pR8XKOQIsBl9ntpr3Tqk5Wdd0XUSVRqMZZS5r2SfjAptBtJe6jWhO8rutKCcYNxjHEW8tetS7QPLQ9bubC+6a1qulUw48SUZPhfWsSTXYBebQbYajqNCELy5lWjBuUE4wjiTWM+tS7AJZuc9svO6j+YUOv+FT8rfSe9V9JtrmzttfOHoiDl0eeDE3DHFjPV3IosTUbmNExR6rK/i0Xu8udI0ujaWSpUYuME20nJyeXzfNmrKy6smvfr7XuzYptU7tK31zZ+2vlD0RBy6PPBibhjixnq6+pGzD1C5ixMUerzfxaL2zee+j6VRtLPoqEXGGXLDk5c3jPN9x4ys2vIriurth6s2KbVO7T2MNq2wthc3Dm4Spyk8ydOSim+1uLTWSbY1u/bp3Z60a5p9uudr10zYuwt4y4KTlKUXFznLikoyTT4eyLw+tLIua1frmPQo0+1TD20bZSzs7vpaEJRlhxy6kpeteM8n3GrI1a7fo3Kux7tYVu1VvUvO72NsK2oSr1KUnOUuOT6SSTl3dWD3b1m/RRFEejzVgWqqt6VpqG7/T61ZyUJ0m+bVOfDHPxRaaXmNtvXb9MbKut4r021M7YX+hbKWdlU4qNNufVxzlxyx8XYvMiPlarevxuz1Q22MK3anbHazFf2iXyX9xDxvFp+Um53Zc3s+huQUAAAAAAAAAAAAAAAAAAE33Y61Qtb+tCvNU1WjHhnLlFSg5cm+zKk/mKrV8WvIsxFHbCw0+/Tarne9WzPT+y+GUPrFP8AU5fhuTySuoybU/8Ao/aCx+GUPrFP9Rw3J5JZ6Ta5j0/sfhlD6xT/AFHDcnkk6Ta5j0/sfhlD6xT/AFM8NyeSTpNrmP2gsfhlD6xT/Uxw3J5JOk2uY/aCx+GUPrFP9Rw3J5JOk2uY9P7H4ZQ+sU/1HDcnkk6Ta5j9oLH4ZQ+sU/1HDcnkk6Ta5j9oLH4ZQ+sU/wBRw3J5JOk2uY/aCx+GUPrFP9TPDcnkk6Ta5llrG1VlR06pJXNKo+FqEIVI1JSk1yWIvl3krE0y/wDtiaqdkQ038u3FE7JaKaOyc0oAAAAAAAAAAAAAAAAAAAFUAyAyAyAyAyAyAyAyAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"};

        if (!products) {
            return <Text> Du skal være logget ind eller have oprettet et produkt </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const productKeys = Object.keys(products);

        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
        return (
            <FlatList
                data={productArray}
                keyExtractor={(item, index) => productKeys[index]}
                renderItem={({item, index}) => {
                    const name = `${item.brand}`;
                    const price = `${item.price}`;

                    return (
                        <Row
                            title={name}
                            price={price}
                            Photo={image}
                            id={productKeys[index]}
                            onSelect={this.handleSelectProduct}
                        />
                    );
                }}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={() => <Separator/>}
                ListFooterComponent={() => <Separator/>}
                contentContainerStyle={{paddingVertical: 20}}
            />
        );
    }
}