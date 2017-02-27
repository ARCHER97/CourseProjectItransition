class Languages{
    
    langRu : string[]
    langEn : string[]
    public mapComponentRu = new Map<string, Map<string,string>>();
    public mapComponentEn = new Map<string, Map<string,string>>();
    constructor(){
        this.langRu = ["Конструктор сайтов","Конструктор","Создать новый сайт",
                       "Создать новую страницу","Сохранить активную страницу","Удалить активную страницу",
                       "Удалить активный сайт","навбар1","навбар2","навбар3",
                       "Профиль","Войти","Выйти","Сайты","Страницы","Выберите страницу сайта","Имя:","создать",
                       "Имя:","создать","перерисовать","Удалить компонент","Удалить контейнер","Сохранить"]
        this.langEn = ["WebSite Constructor","Constructor","Create new site",
                       "Create new page","Save active page","Delete active page",
                       "Delete active site","Menu style","navbar1","navbar2","navbar3",
                       "Profile","Login","Logout","Sites","Pages","Choose a page of site","Name:","create",
                       "Name:","create","reView border","Delete component","Delete contaner","Save"]
        
        this.mapComponentRu.set("topNavbar",new Map<string, string>())
        this.mapComponentRu.set("start",new Map<string, string>())
        this.mapComponentRu.set("profile",new Map<string, string>())
        this.mapComponentRu.set("leftMenu",new Map<string, string>())
        this.mapComponentRu.set("createsite",new Map<string, string>())
        this.mapComponentRu.set("createpage",new Map<string, string>())
        this.mapComponentRu.set("constructor",new Map<string, string>())
        this.mapComponentRu.set("constructorItem",new Map<string, string>())
        this.mapComponentRu.set("concretsitepreview",new Map<string, string>())
        this.mapComponentRu.set("aboutsite",new Map<string, string>())

        this.mapComponentEn.set("topNavbar",new Map<string, string>())
        this.mapComponentEn.set("start",new Map<string, string>())
        this.mapComponentEn.set("profile",new Map<string, string>())
        this.mapComponentEn.set("leftMenu",new Map<string, string>())
        this.mapComponentEn.set("createsite",new Map<string, string>())
        this.mapComponentEn.set("createpage",new Map<string, string>())
        this.mapComponentEn.set("constructor",new Map<string, string>())
        this.mapComponentEn.set("constructorItem",new Map<string, string>())
        this.mapComponentEn.set("concretsitepreview",new Map<string, string>())
        this.mapComponentEn.set("aboutsite",new Map<string, string>())


    
        this.getLang("Ru", "topNavbar").set("nameofsite","Конструктор сайтов")
        this.getLang("En", "topNavbar").set("nameofsite","WebSite Constructor")

        this.getLang("Ru", "topNavbar").set("menuElement1","Конструктор")
        this.getLang("En", "topNavbar").set("menuElement1","Constructor")
        
        this.getLang("Ru", "topNavbar").set("menuOperation","Доступные операции")
        this.getLang("En", "topNavbar").set("menuOperation","Menu operation")

        this.getLang("Ru", "topNavbar").set("createsite","Создать сайт")
        this.getLang("En", "topNavbar").set("createsite","Create site")  

        this.getLang("Ru", "topNavbar").set("createpage","Создать страницу") 
        this.getLang("En", "topNavbar").set("createpage","Create page") 

        this.getLang("Ru", "topNavbar").set("savepage","Сохранить активную страницу") 
        this.getLang("En", "topNavbar").set("savepage","Save active page") 

        this.getLang("Ru", "topNavbar").set("deletepage","Удалить активную страницу") 
        this.getLang("En", "topNavbar").set("deletepage","Delete active page") 

        this.getLang("Ru", "topNavbar").set("deletesite","Удалить сайт") 
        this.getLang("En", "topNavbar").set("deletesite","Delete site") 

        this.getLang("Ru", "topNavbar").set("stylenavbar","Стили") 
        this.getLang("En", "topNavbar").set("stylenavbar","Styles") 

        this.getLang("Ru", "topNavbar").set("stylenavbar1","Стиль 1") 
        this.getLang("En", "topNavbar").set("stylenavbar1","Style 1") 

        this.getLang("Ru", "topNavbar").set("stylenavbar2","Стиль 2") 
        this.getLang("En", "topNavbar").set("stylenavbar2","Style 2") 

        this.getLang("Ru", "topNavbar").set("stylenavbar3","Стиль 3") 
        this.getLang("En", "topNavbar").set("stylenavbar3","Style 3") 

        this.getLang("Ru", "topNavbar").set("lang","Язык") 
        this.getLang("En", "topNavbar").set("lang","Lang") 

        this.getLang("Ru", "topNavbar").set("concretlang","Русский") 
        this.getLang("En", "topNavbar").set("concretlang","English") 

        this.getLang("Ru", "topNavbar").set("profile","Профиль") 
        this.getLang("En", "topNavbar").set("profile","Profile") 

        this.getLang("Ru", "topNavbar").set("login","Войти") 
        this.getLang("En", "topNavbar").set("login","Login")

        this.getLang("Ru", "topNavbar").set("logout","Выйти") 
        this.getLang("En", "topNavbar").set("logout","Logout")
        
        
    }
    getLang(lang: string, component: string): Map<string, string>{
        if(lang == "Ru") return this.mapComponentRu.get(component)
        else if(lang == "En") return this.mapComponentEn.get(component)
    }
    
}
export class Lang{
    lang = "En"
    setLang(lang){
        this.lang = lang
    }
}
export var languages = new Languages()
export var lang = new Lang()