import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, SafeAreaView, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";

import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import { HeaderWithBackAction } from "../../Components/CustomHeader/Header";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");
import Lang from "../../Language";
import RenderHtml from "react-native-render-html";
import Scaler from "../../Utils/Scaler";

export default function PrivacyPolicy({ navigation }) {
  const [dataShow, setDataShow] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    if (Lang.PRIVACY_NOTICE === "Avis de confidentialit√©") {
      setDataShow(true);
    } else {
      setDataShow(false);
    }
  }, []);

  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={CommonStyle.container}>
        <HeaderWithBackAction back_nav={() => navigation.pop()} />
        {/* <Spacer size={Scaler(60)} /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TextField
            textStyle={{
              left: Scaler(20),
              fontSize: Scaler(27),
              width: wp(60),
              color: "#000",
              marginTop: Scaler(15),
              fontFamily: "Poppins-Medium",
            }}
            status={Lang.PRIVACY_NOTICE}
          />
          <Spacer />

          <View style={{ width: width - 30, alignSelf: "center" }}>
            {dataShow ? (
              <RenderHtml
                contentWidth={"100%"}
                source={{
                  html: `<!DOCTYPE html>
<html>
    <body>
<div class="edit-profile">
    <div class="terms" *ngIf="selectedLanguage=='en'">
        <p style='margin:0in;font-size:16px;background:white;'><span style='font-size:24px;font-family:"Arial",sans-serif;color:#141414;' >R√©sum√©</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>La gestion des informations personnelles est fondamentale pour les services de RehvUp Technologies Inc. et nous nous engageons √† prot√©ger votre vie priv√©e.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. collecte et utilise des informations personnelles pour vous identifier, √©tablir votre √©ligibilit√© et fournir un contenu technologique afin d'√©tablir un √©tat plus positif et g√©n√©ral de bonheur et de bien-√™tre. Nous utilisons √©galement vos informations √† nos propres fins, notamment pour analyser et am√©liorer nos services et pour les communications.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Veuillez consulter les rubriques ci-dessous pour obtenir des informations plus d√©taill√©es sur la mani√®re dont RehvUp Technologies Inc. traite vos informations personnelles et sur tout sujet d'int√©r√™t dans notre politique de confidentialit√©.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >√Ä propos de cette politique de confidentialit√©</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous avons cr√©√© cette politique de confidentialit√© pour vous dire :</span></p>

<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > Quelles informations personnelles pourrions-nous collecter √† votre sujet ?</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Ce que nous pourrions faire de ces informations personnelles ; et</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Vos choix concernant les informations personnelles que vous fournissez.</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Cette politique couvre nos sites Web et notre application mobile. Cette politique couvre sp√©cifiquement notre traitement des informations personnelles relatives √† des personnes identifiables et ne s'applique pas aux informations commerciales exclusives.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Certains de nos services sont fournis au nom de nos clients, ce qui signifie que notre client reste principalement responsable de vos informations personnelles. Par exemple, nous pouvons fournir des services au nom de votre employeur ou promoteur de r√©gime. Dans ces circonstances, nous pouvons rediriger une requ√™te concernant notre utilisation de vos informations personnelles vers notre client.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Obtenir votre consentement</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Dans le cadre de l'utilisation de nos services ou de l'interaction avec nous, nous pouvons collecter et traiter certaines informations vous concernant. Lorsque nous le ferons, nous collecterons, utiliserons ou partagerons vos informations personnelles avec votre consentement aux fins dont nous vous avons inform√©s, ou tel que cela peut √™tre autrement autoris√© ou requis par la loi. Votre consentement peut √™tre expr√®s ou tacite. Par exemple, en utilisant notre application, vous consentez √† ce que RehvUp Technologies Inc. collecte et utilise vos informations personnelles pour vous fournir des services. Dans certaines situations, nous pouvons obtenir votre consentement directement (y compris comme d√©crit dans cette politique de confidentialit√©). Dans d'autres situations, nous pouvons nous fier au consentement que vous avez fourni √† votre employeur ou √† votre sponsor d'avantages sociaux.</span></p>

<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Vous pouvez refuser ou retirer votre consentement √† la collecte, √† l'utilisation ou au partage de vos informations personnelles, tant qu'il n'existe aucune exigence l√©gale ou contractuelle nous obligeant √† traiter vos informations. Selon les circonstances, cependant, le retrait de votre consentement aura un impact sur notre capacit√© √† vous servir et sur votre utilisation de l'application.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >O√Ļ obtenons-nous vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous recueillons des informations personnelles des mani√®res suivantes :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Directement aupr√®s de vous ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > De votre utilisation des sites Web et applications de RehvUp Technologies Inc. ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >De votre employeur, association, assureur ou promoteur de r√©gime ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous assistez √† un site ou √©v√©nement de Rehvup Technologies Inc. ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous postulez pour un poste chez Rehvup Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Si vous nous contactez pour une plainte ou une question ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous interagissez avec nous sur les r√©seaux sociaux ; et/ou</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >De tiers l√©galement autoris√©s.</span></li>
</ul>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Quelles informations collectons-nous et pourquoi</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Nous pouvons collecter et utiliser les types d'informations suivants aux fins suivantes :</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Cat√©gorie Informations personnelles</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations d'identit√©</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Types d'informations que nous pouvons collecter</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Votre nom, nom d'utilisateur, num√©ro d'employ√© ou identifiant similaire, √©tat civil, date de naissance et sexe d√©clar√©</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Comment pouvons-nous l'utiliser</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous identifier et vous authentifier</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour communiquer avec vous</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour cr√©er et administrer votre compte lorsque vous vous inscrivez √† notre service, y compris via nos sites Web et nos applications</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur l'emploi</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Votre intitul√© de poste, votre lieu de travail, votre date d'embauche, vos ant√©c√©dents professionnels, votre adresse professionnelle</span></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur le mode de vie</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Collectes d'informations sur les centres d'int√©r√™t qui vous int√©ressent afin de vous fournir une information optimale cibl√©e sur vos besoins.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur les interactions</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Enregistrements et transcriptions t√©l√©phoniques, enregistrements de communications (courriels, lettres, chat en ligne, etc.)</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >√Ä des fins d'assurance qualit√© et de formation du personnel</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour conserver un enregistrement de vos interactions avec RehvUp Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous fournir les services et informations que vous demandez</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour communiquer avec vous et r√©pondre √† vos demandes</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour comprendre toute pr√©occupation que vous pourriez avoir, afin que nous puissions r√©soudre les litiges et am√©liorer votre exp√©rience</span></li>
</ul>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur les interactions num√©riques</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' > Donn√©es de g√©olocalisation, adresse IP, donn√©es de connexion, type et version du navigateur, r√©glage et emplacement du fuseau horaire, types et versions de plug-in du navigateur, syst√®me d'exploitation (y compris le type d'appareil utilis√©) et autres technologies, li√©es aux appareils que vous utilisez pour acc√©der √† nos sites Web et/ou √† nos applications</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour personnaliser votre exp√©rience et comprendre comment vous utilisez nos sites et applications</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous informer de tout probl√®me pertinent concernant notre site Web ou notre application (par exemple, les notifications push)</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour mesurer les performances de nos applications et sites Web</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour identifier les opportunit√©s de nouveaux produits/services ou d'am√©liorations de ceux existants</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >√Ä des fins de d√©veloppement et de planification de syst√®me ou de produit, d'audit et d'administration</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour plus d'informations sur notre utilisation des cookies, de Google Analytics et des technologies associ√©es, veuillez consulter notre politique en mati√®re de cookies.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur le candidat</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' > CV, lettre de motivation, lettres de r√©f√©rence, ant√©c√©dents professionnels et int√©r√™ts</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour les activit√©s de dotation et de recrutement</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Maintenir un inventaire des candidats pour les opportunit√©s de travail actuelles et futures</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons √©galement collecter et utiliser vos informations pour :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Comprendre vos besoins, la pertinence de nos produits et services, et √©valuer les besoins futurs ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Fournir des services adapt√©s √† vos besoins et vous traiter de mani√®re plus personnelle ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Promouvoir et commercialiser nos produits et services aupr√®s de vous ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Am√©liorer nos op√©rations commerciales et la qualit√© de nos produits et services ;</span></li>

    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >D√©velopper et tester de nouveaux produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >G√©rer nos besoins commerciaux et op√©rationnels ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Administrer et prot√©ger la s√©curit√© de notre entreprise et de nos sites Web, applications et autres services ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Respecter nos obligations l√©gales et r√©glementaires, y compris pour faire respecter nos droits l√©gaux ; et</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > R√©aliser d'autres fins li√©es √† l'un des √©l√©ments ci-dessus.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations d√©personnalis√©es, agr√©g√©es et anonymis√©es</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons utiliser vos informations personnelles pour g√©n√©rer des informations d√©personnalis√©es, agr√©g√©es ou anonymis√©es qui ne r√©v√®lent pas votre identit√©. RehvUp Technologies Inc. utilise ces informations pour effectuer des recherches, compiler des ensembles de donn√©es agr√©g√©es, des statistiques et des rapports, et pour effectuer des analyses sur nos services, nos normes de service, nos op√©rations commerciales et nos tendances.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons partager des informations d√©personnalis√©es, agr√©g√©es ou anonymis√©es avec nos clients √† des fins de reporting, y compris l'utilisation de nos services, et avec des prestataires de services tiers √† des fins de cr√©ation de supports marketing, d'√©tudes de cas et d'analyses statistiques . Cela permet √† RehvUp Technologies Inc., √† ses clients et √† nos fournisseurs de services tiers respectifs de comprendre nos performances ou de d√©velopper des produits, services ou offres pertinents.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Quand RehvUp Technologies Inc. partage-t-il vos informations personnelles ?</span></p>

<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. peut partager vos informations personnelles avec :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Autres entit√©s de RehvUp Technologies Inc. afin de vous servir, y compris pour notre gestion interne et √† des fins administratives.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Les fournisseurs de services tiers qui sont tenus de garder vos informations confidentielles et s√©curis√©es et qui ne sont pas autoris√©s √† utiliser ou √† divulguer des informations pour des raisons autres que l'ex√©cution de services en notre nom ou pour se conformer aux exigences l√©gales.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Des tiers et partenaires en cas d'√©ventuelle fusion ou acquisition, apport d'actifs, r√©organisation ou faillite. Ces parties sont √©galement tenues de garder vos informations confidentielles et s√©curis√©es et sont limit√©es dans leur utilisation des informations √† cette fin.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Les organismes gouvernementaux, de r√©glementation et d'application de la loi pour respecter nos obligations en mati√®re de conformit√©, de r√©glementation et de gestion des risques ou pour se conformer √† la loi.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > Le grand public et les autres utilisateurs lorsque vous publiez ou partagez des commentaires, des articles de blog, des t√©moignages ou d'autres informations similaires sur nos plates-formes technologiques</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Votre organisme de parrainage ou votre fournisseur de r√©gime de sant√© lorsque vous donnez votre consentement expr√®s ou implicite ou si nous sommes tenus de le faire par la loi.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Stockage de vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. utilise des centres de donn√©es tiers tels qu'AWS pour stocker vos informations personnelles. &nbsp;Ces informations sont g√©n√©ralement stock√©es dans le pays o√Ļ l'entreprise est situ√©e. &nbsp;De ce fait, il peut arriver que d'autres gouvernements √©trangers, tribunaux, organismes charg√©s de l'application de la loi ou organismes de r√©glementation aient le droit d'acc√©der aux informations personnelles collect√©es et d√©tenues par RehvUp Technologies Inc. ou nos sous-traitants.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Si vous visitez notre application depuis un pays autre que le Canada, votre communication via notre application ou l'un de nos services peut entra√ģner le transfert d'informations au-del√† des fronti√®res internationales. En utilisant notre application ou l'un de nos services, vous consentez √† la collecte, au stockage et au traitement de vos informations au Canada et dans d'autres pays (y compris les √Čtats-Unis, le Royaume-Uni et d'autres lieux) conform√©ment √† la l√©gislation applicable en mati√®re de protection des donn√©es. </span></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Conservation de vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous ne conservons vos informations qu'aussi longtemps que cela est contractuellement, op√©rationnellement ou l√©galement n√©cessaire. Lorsque nous n'avons plus besoin des informations, elles sont soit d√©truites, soit anonymis√©es.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Garanties</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous utilisons des mesures de protection physiques, technologiques, organisationnelles et contractuelles raisonnables, adapt√©es √† la sensibilit√© des informations, pour prot√©ger les informations personnelles en notre possession ou sous notre contr√īle contre tout acc√®s, divulgation ou utilisation non autoris√©s.</ √©tendue></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Coordonn√©es</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Veuillez soumettre toute question par e-mail √† : <a href="mailto:info@rehvup.io"><span style='font-family:"Arial",sans-serif;'>info@rehvup.io</span></a></span></span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Veuillez noter que nous devrons peut-√™tre confirmer votre identit√©, demander des d√©tails suppl√©mentaires et travailler avec d'autres services de RehvUp Technologies Inc. pour vous r√©pondre ou examiner vos pr√©occupations ou votre plainte.</span></ p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-family:"Arial",sans-serif;color:#141414;'>Modifications de notre politique de confidentialit√© </span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons modifier cet avis de temps √† autre et publierons la version la plus r√©cente en ligne.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Derni√®re mise √† jour : d√©cembre 2021</span></p>
<p style='margin:0in;font-size:16px;'>&nbsp;</p>
    </div>

   <div *ngIf="selectedLanguage!=='fr'">
        <p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:24px;color:#141414;" >R√©sum√©</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">La gestion des renseignements personnels est fondamentale pour RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color :#141414;">&nbsp;Technologies Inc.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;"> et nous nous engageons &agrave; prot√©ger votre vie priv√©e.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (en)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">recueil et use des renseignements personnels pour vous identifier, √©tablir votre admissibilit√©; et fournir un&nbsp;</span><span style="color:black;">contenu technologique afin&nbsp;</span><span style="font-size:18px;color:#141414;">d√©tablir un √©tat plus positif et g√©n√©ral de bonheur et de bien-√™tre.</span><span style="color:black;">&nbsp;</span><span style="font- size:18px;color:#141414;">Nous utilisons √©galement vos informations &agrave; nos propres fins, y compris pour analyseur et am√©liorer nos services et pour les communications.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Veuillez consulter les titres ci-dessous pour obtenir des informations plus d√©tails sur la fa&ccedil;on dont RehvUp</span><span style ="font-size:18px;color:#141414;">traite vos informations personnelles et sur tout sujet d'int√©r√™t dans notre politique de confidentialit√©.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >&Agrave ; propos de cette politique de confidentialit√©</span></p>

<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous avons cr√©√©; cette politique de confidentialit√©&eacute; pour vous dire :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les renseignements personnels que nous conseillons de dispenser &agrave; votre sujet ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Ce que nous demandons faire avec ces renseignements personnels ; et</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Vos choix concernant les renseignements personnels que vous fournissez.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Cette politique couvre nos sites Web et notre application mobile.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px ;color:#141414;">Cette politique couvre sp√©cifiquement notre traitement des informations personnelles relatives &agrave; des personnes identifiables, et ne s'applique pas aux informations commerciales exclusives.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Certains de nos services sont fournis au nom de nos clients, ce qui signifie que notre client reste principalement responsable de vos informations personnelles. Par exemple, nous pouvons fournir des services au nom de votre employeur ou de votre promoteur de r√©gime. Dans ces circonstances, nous pouvons renvoyer une question sur notre utilisation de vos renseignements personnels &agrave; notre client.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Obtenir votre consentement</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Dans le cadre de l'utilisation de nos services ou de l'interaction avec nous, nous pouvons collecter et traiter certains d√©tails concernant vous. Lorsque nous le faisons, nous recueillons, utilisonsons ou partageons vos renseignements personnels avec votre consentement aux fins dont nous vous avons inform√©, ou tel qu'il peut √™tre autrement permis ou requis par la loi. Votre consentement peut √™tre explicite ou implicite. Par exemple, en utilisant notre application,</span><span style="color:black;">vous</span><span style="font-size:18px;color:#141414;">consentez &agrave;&nbsp ;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">RehvUp</span><span style=" color:black ;">&nbsp;Technologies</span><span style="font-size:18px;color:#141414;">&nbsp;Inc.</span><span style="color:black;"> &nbsp;</span><span style="font-size:18px;color:#141414;">la collecte et l&rsquo;utilisation de vos renseignements personnels pour&nbsp;</span><span style="color:black;" >vous fournissez des&nbsp;</span><span style="font-size:18px;color:#141414;">services. Dans certaines situations, nous pouvons obtenir votre consentement directement (y compris comme √©crit dans cette politique de confidentialit√©). Dans d'autres situations, nous pouvons nous fier au consentement que vous avez donn√©; &une tombe; votre employeur ou &agrave; votre promoteur d'avantages sociaux.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Vous pouvez refuser ou retirer votre consentement &agrave; ce que nous recueillons, utilisions ou partageons vos personnels, tant qu'il n'y a pas d'exigences l√©gales ou contractuelles pour que nous traitions vos informations. Selon les circonstances, cependant, le retrait de votre consentement aura</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;" >&nbsp;un impact sur notre capacit√©&eacute; &une tombe; vous servir</span><span style="color:black;">&nbsp;et votre utilisation de</span><span style="font-size:18px;color:#141414;">&nbsp;l&rsquo;application .</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >O&ugrave; obtenons-nous vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous recueillons des renseignements personnels des fa&ccedil;ons suivantes :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Directement de vous ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De votre utilisation de RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.</span><span style="font-size:18px;">les sites Web et les applications ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De votre employeur, association, assureur ou promoteur de r√©gime d'avantages sociaux;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous assistez &agrave; un Rehvup</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.,</span><span style= "color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;site ou √©v√©nement;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous postulez pour un poste chez Rehvup</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.</ dur√©e></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Si vous nous contactez avec une plainte ou une requ√™te</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous vous engagez avec nous sur les m√©dias sociaux ; et/ou</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De tiers l√©galement autoris√©s.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Quelles informations nous recueillons et pourquoi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Nous pouvons collecter et utiliser les types d'informations suivantes aux fins suivantes :</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Cat√©gorie de renseignements personnels</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur l'identit√©</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Types d'informations que nous pouvons collecter</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Votre nom, nom d'utilisateur, num√©ro d'employ√© ou identifiant similaire, √©tat matrimonial, date de naissance et sexe d√©clar√©</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Comment nous pouvons l'utiliser</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous identifier et vous authentifier</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour communiquer avec vous</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour cr√©er et administrer votre compte lorsque vous vous inscrivez &agrave; notre service, y compris via nos sites Web et applications</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur l'emploi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Le titre de votre poste, votre lieu de travail, votre date d'embauche, vos ant√©c√©dents professionnels et votre adresse professionnelle</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Informations sur le mode de vie</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Collections d'informations sur les domaines d'int√©r√©t que vous aimez afin</span><span style="color:black;">&nbsp;</span><span style="font-size:18px ;color:#141414;">&nbsp;de vous fournir des informations optimales cibl√©es sur vos besoins.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Informations d'interaction</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Enregistrements t√©l√©phoniques et transcriptions, enregistr√©s de communications (courriels, lettres, clavardage en ligne, etc.)</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >&Agrave ; des fins d&rsquo;assurance de la qualit&eacute; et de formation du personnel</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour conserver un enregistrement de vos interactions avec RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.< /span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous fournir les services et les informations que vous demandez</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour communiquer avec vous et r√©pondre &agrave; vos demandes de renseignements</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour comprendre vos pr√©occupations, afin que nous puissions r√©soudre les litiges et am√©liorer votre exp√©rience</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Information sur l'interaction num√©rique</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Donn√©es de g√©olocalisation, adresse IP, donn√©es de connexion, type et version du navigateur, param√®tre et emplacement du fuseau horaire, types et versions de plug-in de navigateur, syst√®me d'exploitation ( y compris le type d'appareil utilis√©) et autres technologies, li√©es aux appareils que vous utilisez pour acc√©der &agrave; nos sites Web et / ou &agrave; nos applications</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour personnaliser votre exp√©rience et comprendre comment vous utilisez nos sites et applications</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous informer de tout probl√®me me concernant pertinent &une tombe; notre site Web ou &agrave; notre application (par exemple, les notifications push)</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour mesurer les performances de nos applications et sites Web</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Identifier les possibilit√©s de nouveaux produits/services ou am√©liorations aux produits/services existants</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >&Agrave ; des fins de d√©veloppement et de planification de syst√®mes ou de produits, d'audit et d'administration</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour plus d'informations proches &agrave; notre utilisation des cookies, de Google Analytics et de la technologie associ√©e, veuillez consulter notre politique en mati√®re de cookies.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur le candidat &agrave; un emploi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Curriculum vitae, lettre de pr√©sentation, lettres de recommandation, ant√©c√©dents professionnels et int√©r√™ts</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour les activit√©s de dotation et de recrutement</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Tenir &agrave; jour un inventaire des candidats pour les possibilit√©s d'emploi actuelles et futures</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons √©galement collecter et utiliser vos informations pour :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Comprendre vos besoins, la pertinence de nos produits et services, et √©valuer les besoins futurs ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Fournir des services adapt√©s &agrave; vos besoins et pour vous traiter d'une mani√®re plus personnelle;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Promouvoir et commercialiser nos produits et services aupr√©s de vous;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Am√©liorer nos op√©rations commerciales et la qualit√©; de nos produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >D√©velopper et mettre &agrave; l'essai de nouveaux produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >G√©rer nos besoins op√©rationnels et op√©rationnels ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Administrer et prot√©ger la s√©curit√© de notre entreprise et de nos sites Web, applications et autres services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Respecter nos obligations l√©gales et r√©glementaires, y compris pour faire respecter nos droits l√©gaux ; et</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >R√©aliser d'autres fins liees &agrave; l&rsquo;un des √©l√©ments ci-dessus.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements d√©personnalis√©s, agr√©g√©s et anonymis√©s</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons utiliser vos informations personnelles pour g√©n√©rer des informations d√©personnalis√©es, agr√©es ou anonymis√©es qui ne r√©v√®lent pas votre identit√©. RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc. (en)</ span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">utilise ces informations pour mener des recherches, compiler des ensembles de donn√©es ;es agr√©es, des statistiques et des rapports, et pour effectuer des analyses sur nos services, nos normes de service, nos op√©rations commerciales et nos tendances.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons partager des informations d√©personnalis√©es, agr√©es ou anonymis√©es avec nos clients &agrave; des fins de reporting, y compris l'utilisation de nos services, et avec des fournisseurs de services tiers pour une utilisation dans la cr√©ation de documents marketing, √©tudes de cas et analyses statistiques. Cela permet &agrave; RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="font-size:18px;color:#141414;">, ses clients et nos fournisseurs de services tiers respectifs pour comprendre notre performance ou d&eacute ;d√©velopper des produits, des services ou des offres pertinentes.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Quand RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span ><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">partager vos renseignements personnels ?</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (fr)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">peut partager vos renseignements personnels avec :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Autres Technologies RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Inc.</span><span style= "color:black;">&nbsp;</span><span style="font-size:18px;">afin de vous servir, y compris &agrave; des fins de gestion interne et d'administration.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les fournisseurs de services tiers qui sont tenus de garder vos informations confidentielles et s√©curis√©es et qui sont emp√™ch√©s d'utiliser ou de divulguer des informations pour des raisons autres que la prestation de services en notre nom ou de se conformer aux exigences l√©gales.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Tiers et associ√©s en cas de fusion ou d'acquisition potentielle, de transfert d'actifs, de r√©organisation ou de faillite. Ces parties sont √©galement tenues de garder vos informations confidentielles et s√©curis√©es et sont limit√©es dans leur utilisation des informations &agrave; cette fin.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les organismes gouvernementaux, r√©glementaires et d'application de la loi pour respecter nos obligations en mati√®re de conformit√©, de r√©glementation et de gestion des risques ou pour se conformer &agrave; la loi.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Le grand public et d'autres utilisateurs lorsque vous publiez ou partagez des commentaires, des articles de blog, des t√©moignages ou d'autres informations similaires sur nos plateformes technologiques</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Votre organisme parrain ou votre fournisseur de r√©gime de soins de sant√©; lorsque vous donnez votre consentement exprim√© ou implicite ou si nous sommes tenus de le faire par la loi.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Stockage de vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (en)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">utilise des centres de donn√©es tiers tels qu'AWS pour stocker vos informations personnelles. &nbsp;Ces informations sont g√©n√©ralement stock√©es dans le pays o&ugrave; l'entreprise est situ√©e.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">Pour cette raison , il peut y avoir des circonstances o&ugrave; d'autres gouvernements, tribunaux, organismes d'application de la loi ou organismes de r√©glementation √©trangers ont le droit d'acc√©der aux renseignements personnels recueillis et d√©tenus par&nbsp;</span><span style=" color:black ;">&nbsp;</span><span style="font-size:18px;color:#141414;">RehvUp</span><span style="color:black;">&nbsp;</ span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="color:black;">&nbsp;</span><span style= "font-size:18px;color:#141414;">ou nos sous-traitants.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Si vous visitez notre application</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414; ">&nbsp;&agrave; partir d'un pays autre que le Canada, votre communication via notre&nbsp;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">application</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;ou l&rsquo;un de nos services peuvent entra&icirc;ner le transfert d&rsquo;informations au-del&agrave; des fronti√®res internationales. En utilisant notre&nbsp;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">application&nbsp;</span><span style="font-size:18px;color:#141414;">ou l&rsquo;un de nos services, vous consentez &agrave; la collecte, au stockage et au traitement de vos informations au Canada et dans d&rsquo;autres pays (y compris les &Eacute;tats-Unis, le Royaume-Uni&nbsp;</span><span style="color:black;">&nbsp ;</span><span style="font-size:18px;color:#141414;">et d&rsquo;autres endroits).</span><span style="color:black;">&nbsp;</span ><span style="font-size:18px;color:#141414;">) conform√©ment &agrave; la l√©gislation applicable en mati√®re de protection des donn√©es.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Conservation de vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous ne conservons vos informations que tant qu'elles sont contractuellement, op√©rationnellement ou l√©galement n√©cessaires. Lorsque nous n'avons plus besoin de l'information, elle est soit d√©truite, soit d√©personnalis√©e.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Mesures de protection</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous utilisons des mesures de protection physiques, technologiques, organisationnelles et contractuelles raisonnables, appropri√©es &agrave; la sensibilit√© des informations, pour prot√©ger les informations personnelles en notre possession ou sous notre contr√īle, contre l'acc√®s, la divulgation ou l'utilisation non autoris√©e.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Coordonn√©es de la personne-ressource</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Veuillez soumettre toute question par courriel &agrave; l'adresse suivante : <a href="mailto:info@rehvup.io"><span style='font-family:"Arial",sans-serif;'>info@rehvup.io</span></a></span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Veuillez noter que nous devrons peut-√™tre confirmer votre identit√©, demander des d√©tails suppl√©mentaires et travailler avec d'autres RehvUp</span><span style="color:black ;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="font-size:18px;color:#141414;">pour vous r√©pondre ou pour examiner vos pr√©occupations ou votre plainte.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="color:#141414;">Modifications apport√©es &agrave ; notre politique de confidentialit√©</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons modifier cet avis de temps &agrave; autre et publierons la version la plus r√©cente en ligne.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Derni√®re mise en place&agrave; jour : d√©cembre</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;2021</span ></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    </div>
</div>
</body>
</html>`,
                }}
              />
            ) : (
              <RenderHtml
                contentWidth={"100%"}
                source={{
                  html: `<!DOCTYPE html>
<html>
    <body>
<div class="edit-profile">
    <div class="terms" *ngIf="selectedLanguage=='en'">
        <p style='margin:0in;font-size:16px;background:white;'><span style='font-size:24px;font-family:"Arial",sans-serif;color:#141414;'>Summary</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>The management of personal information is fundamental to RehvUp Technologies Inc. services and we are committed to protecting your privacy.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>RehvUp Technologies Inc. collects and uses personal information to identify you, establish eligibility, and to provide technology-enabled content to establish a more positive and general state of happiness and wellbeing. We also use your information for our own purposes, including to analyze and improve our services and for communications.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Please see the headings below to get more detailed information on how RehvUp Technologies Inc. handles your personal information and on any topics of interest in our privacy policy.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>About this privacy policy</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We created this privacy policy to tell you:</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>What personal information we might collect about you;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>What we might do with that personal information; and</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Your choices about the personal information you provide.</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>This policy covers our websites and mobile App. This policy specifically covers our handling of personal information relating to identifiable individuals, and does not apply to proprietary business information.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Some of our services are provided on behalf of our clients, which means our client remains primarily responsible for your personal information. For instance, we may be providing services on behalf of your employer or plan sponsor. In these circumstances, we may re-direct a query about our use of your personal information to our client.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Getting your consent</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>As part of using our services or interacting with us, we may collect and process some details about you. When we do so, we will collect, use or share your personal information with your consent for the purposes we&rsquo;ve informed you of, or as may be otherwise permitted or required by law. Your consent can be express or implied. For example, by using our App, you consent to RehvUp Technologies Inc. collection and use of your personal information to provide services back to you. In some situations, we may get consent directly from you (including as described in this privacy policy). In other situations, we may rely on the consent you provided to your employer or benefits sponsor.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>You can withhold or withdraw your consent for us to collect, use or share your personal information, as long as there are no legal or contractual requirements for us to process your information. Depending on the circumstances, however, withdrawal of your consent will impact our ability to serve you and your utilization of the app.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Where we get your information</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We collect personal information in the following ways:</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Directly from you;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>From your use of RehvUp Technologies Inc. websites and apps;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>From your employer, association, insurer or benefits plan sponsor;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>When you attend a Rehvup Technologies Inc., site or event;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>When you apply for a position at Rehvup Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>If you contact us with a complaint or query;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>When you engage with us over social media; and/or</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>From legally authorized third parties.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>What information we collect and why</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may collect and use the following types of information for the following purposes:</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Personal information category</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Identity information</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Types of information we may collect</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Your name, username, employee number or similar identifier, marital status, date of birth and reported gender</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>How we may use it</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To identify and authenticate you</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To communicate with you</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To create and administer your account when you register for our service, including through our websites and apps</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Employment information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Your job title, place of work, hire date, employment history, work address</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Lifestyle information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Collections of information on areas of interest you enjoy in order to provide you optimal information targeted to your needs.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Interaction information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Telephone recordings and transcripts, records of communications (emails, letters, online chat etc.)</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>For quality assurance and staff training purposes</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To retain a record of your interactions with RehvUp Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To provide you with the services and information which you request</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To communicate with you and respond to your inquiries</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To understand any concerns you may have, so that we can resolve disputes and improve your experience</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Digital interaction information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Geolocation data, IP address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system (including the type of device used) and other technology, related to the devices you use to access our websites and/or our apps</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To personalize your experience and understand how you use our sites and apps</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To notify you of any relevant issues relating to our website or app (e.g., push notifications)</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To measure how our apps and websites are performing</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To identify opportunities for new products/services or improvements to existing ones</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>For system or product development and planning, audit and administrative purposes</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>For more information relating to our use of cookies, Google Analytics, and related technology, please review our cookie policy.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Job applicant information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>R&eacute;sum&eacute;, cover letter, reference letters, employment history and interests</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>For staffing and recruitment activities</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>To maintain an inventory of candidates for current and future work opportunities</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may also collect and use your information to:</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Understand your needs, the suitability of our products and services, and assess future needs;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Provide services tailored to your requirements and to treat you in a more personal way;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Promote and market our products and services to you;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Improve our business operations and the quality of our products and services;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Develop and test new products and services;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Manage our business and operational needs;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Administer and protect the security of our business, and our websites, apps and other services;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Meet our legal and regulatory obligations, including to enforce our legal rights; and</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Carry out other purposes related to any of the above.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>De-identified, aggregated, and anonymized information</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may use your personal information to generate de-identified, aggregated or anonymized information that does not reveal your identity. RehvUp Technologies Inc. uses this information to conduct research, compile aggregate data sets, statistics and reports, and to perform analytics on our services, service standards, business operations, and trends.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may share de-identified, aggregated or anonymized information with our clients for reporting purposes, including usage of our services, and with third party service providers for use in creating marketing materials, cases studies and statistical analyses. This allows RehvUp Technologies Inc., its clients and our respective third‚ÄĎparty service providers to understand how we are performing, or develop relevant products, services or offers.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>When does RehvUp Technologies Inc. share your personal information?</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>RehvUp Technologies Inc. may share your personal information with:</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Other RehvUp Technologies Inc. entities in order to serve you, including for our internal management and administrative purposes.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Third‚ÄĎparty service providers who are required to keep your information confidential and secure and are restricted from using or disclosing information for reasons other than performing services on our behalf or to complying with legal requirements.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Third parties and partners in the event of a potential merger or acquisition, transfer of assets, reorganization or bankruptcy. These parties are also required to keep your information confidential and secure and are restricted in their use of information to this purpose.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Government, regulatory and law enforcement agencies to meet our compliance, regulatory, and risk management obligations or to comply with the law.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>The general public and other users when you post or share comments, blog postings, testimonials, or other similar information on our technology platforms</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Your sponsoring organization or health plan provider when you provide your express or implied consent or if we are required to do so by law.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Storage of your information</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>RehvUp Technologies Inc. utilizes third party data centers such as AWS to store your personal information. &nbsp;Such information is usually stored in the country where the company is situated in. &nbsp;Because of this, there may circumstances where other foreign governments, courts, law enforcement agencies or regulatory agencies are entitled to access the personal information collected and held by RehvUp Technologies Inc. or our sub-contractors.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>If you are visiting our App from a country other than Canada, your communication through our App or any of our services may result in the transfer of information across international boundaries. By using our App or any of our services, you consent to the collection, storage, and processing of your information in Canada and other countries (including the United States, the UK, and other locations.) in accordance with applicable data protection legislation.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Retention of your information</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We only keep your information as long as it is contractually, operationally or legally necessary. When we no longer need the information, it is either destroyed or de-identified.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Safeguards</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We use reasonable physical, technological, organizational and contractual safeguards, appropriate to the sensitivity of the information, to protect personal information in our possession or under our control, from unauthorized access, disclosure or use.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Contact information</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Please submit any queries via email to: <a href="mailto:info@rehvup.io"><span style='font-family:"Arial",sans-serif;'>info@rehvup.io</span></a></span></span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Please note that we may need to confirm your identity, request additional details and work with other RehvUp Technologies Inc. departments to respond to you or to look into your concerns or complaint.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-family:"Arial",sans-serif;color:#141414;'>Changes to our privacy policy</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may modify this notice from time to time and will post the most current version online.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Last updated: December, 2021</span></p>
<p style='margin:0in;font-size:16px;'>&nbsp;</p>
    </div>

</div>
</body>
</html>`,
                }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
