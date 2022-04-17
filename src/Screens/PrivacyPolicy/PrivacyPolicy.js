import React, {useEffect, useState} from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import {
  getFontSize,
  responsiveSize,
} from "../../Components/SharedComponents/ResponsiveSize";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import { HeaderWithBackAction } from "../../Components/CustomHeader/Header";
import { useTheme } from "react-native-paper";
import Scaler from "../../Utils/Scaler";
const { width } = Dimensions.get("window");
import Lang from "../../Language";
import RenderHtml from "react-native-render-html";
export default function PrivacyPolicy({ navigation }) {
  const [dataShow, setDataShow] = useState(false)
  const theme = useTheme();
  useEffect(() => {
    if(Lang.PRIVACY_NOTICE === "Avis de confidentialité"){
   
      setDataShow(true)
    }else{
      setDataShow(false)
    }
  }, [])

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
              left: responsiveSize(20),
              fontSize: getFontSize(27),
              width: wp(60),
              color: "#000",
              marginTop: responsiveSize(15),
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
        <p style='margin:0in;font-size:16px;background:white;'><span style='font-size:24px;font-family:"Arial",sans-serif;color:#141414;' >Résumé</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>La gestion des informations personnelles est fondamentale pour les services de RehvUp Technologies Inc. et nous nous engageons à protéger votre vie privée.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. collecte et utilise des informations personnelles pour vous identifier, établir votre éligibilité et fournir un contenu technologique afin d'établir un état plus positif et général de bonheur et de bien-être. Nous utilisons également vos informations à nos propres fins, notamment pour analyser et améliorer nos services et pour les communications.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Veuillez consulter les rubriques ci-dessous pour obtenir des informations plus détaillées sur la manière dont RehvUp Technologies Inc. traite vos informations personnelles et sur tout sujet d'intérêt dans notre politique de confidentialité.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >À propos de cette politique de confidentialité</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous avons créé cette politique de confidentialité pour vous dire :</span></p>

<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > Quelles informations personnelles pourrions-nous collecter à votre sujet ?</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Ce que nous pourrions faire de ces informations personnelles ; et</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Vos choix concernant les informations personnelles que vous fournissez.</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Cette politique couvre nos sites Web et notre application mobile. Cette politique couvre spécifiquement notre traitement des informations personnelles relatives à des personnes identifiables et ne s'applique pas aux informations commerciales exclusives.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Certains de nos services sont fournis au nom de nos clients, ce qui signifie que notre client reste principalement responsable de vos informations personnelles. Par exemple, nous pouvons fournir des services au nom de votre employeur ou promoteur de régime. Dans ces circonstances, nous pouvons rediriger une requête concernant notre utilisation de vos informations personnelles vers notre client.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Obtenir votre consentement</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Dans le cadre de l'utilisation de nos services ou de l'interaction avec nous, nous pouvons collecter et traiter certaines informations vous concernant. Lorsque nous le ferons, nous collecterons, utiliserons ou partagerons vos informations personnelles avec votre consentement aux fins dont nous vous avons informés, ou tel que cela peut être autrement autorisé ou requis par la loi. Votre consentement peut être exprès ou tacite. Par exemple, en utilisant notre application, vous consentez à ce que RehvUp Technologies Inc. collecte et utilise vos informations personnelles pour vous fournir des services. Dans certaines situations, nous pouvons obtenir votre consentement directement (y compris comme décrit dans cette politique de confidentialité). Dans d'autres situations, nous pouvons nous fier au consentement que vous avez fourni à votre employeur ou à votre sponsor d'avantages sociaux.</span></p>

<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Vous pouvez refuser ou retirer votre consentement à la collecte, à l'utilisation ou au partage de vos informations personnelles, tant qu'il n'existe aucune exigence légale ou contractuelle nous obligeant à traiter vos informations. Selon les circonstances, cependant, le retrait de votre consentement aura un impact sur notre capacité à vous servir et sur votre utilisation de l'application.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Où obtenons-nous vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous recueillons des informations personnelles des manières suivantes :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Directement auprès de vous ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > De votre utilisation des sites Web et applications de RehvUp Technologies Inc. ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >De votre employeur, association, assureur ou promoteur de régime ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous assistez à un site ou événement de Rehvup Technologies Inc. ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous postulez pour un poste chez Rehvup Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Si vous nous contactez pour une plainte ou une question ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Lorsque vous interagissez avec nous sur les réseaux sociaux ; et/ou</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >De tiers légalement autorisés.</span></li>
</ul>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Quelles informations collectons-nous et pourquoi</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Nous pouvons collecter et utiliser les types d'informations suivants aux fins suivantes :</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Catégorie Informations personnelles</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations d'identité</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Types d'informations que nous pouvons collecter</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Votre nom, nom d'utilisateur, numéro d'employé ou identifiant similaire, état civil, date de naissance et sexe déclaré</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Comment pouvons-nous l'utiliser</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous identifier et vous authentifier</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour communiquer avec vous</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour créer et administrer votre compte lorsque vous vous inscrivez à notre service, y compris via nos sites Web et nos applications</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur l'emploi</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Votre intitulé de poste, votre lieu de travail, votre date d'embauche, vos antécédents professionnels, votre adresse professionnelle</span></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur le mode de vie</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Collectes d'informations sur les centres d'intérêt qui vous intéressent afin de vous fournir une information optimale ciblée sur vos besoins.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur les interactions</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Enregistrements et transcriptions téléphoniques, enregistrements de communications (courriels, lettres, chat en ligne, etc.)</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >À des fins d'assurance qualité et de formation du personnel</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour conserver un enregistrement de vos interactions avec RehvUp Technologies Inc.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous fournir les services et informations que vous demandez</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour communiquer avec vous et répondre à vos demandes</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour comprendre toute préoccupation que vous pourriez avoir, afin que nous puissions résoudre les litiges et améliorer votre expérience</span></li>
</ul>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur les interactions numériques</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' > Données de géolocalisation, adresse IP, données de connexion, type et version du navigateur, réglage et emplacement du fuseau horaire, types et versions de plug-in du navigateur, système d'exploitation (y compris le type d'appareil utilisé) et autres technologies, liées aux appareils que vous utilisez pour accéder à nos sites Web et/ou à nos applications</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour personnaliser votre expérience et comprendre comment vous utilisez nos sites et applications</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour vous informer de tout problème pertinent concernant notre site Web ou notre application (par exemple, les notifications push)</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour mesurer les performances de nos applications et sites Web</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour identifier les opportunités de nouveaux produits/services ou d'améliorations de ceux existants</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >À des fins de développement et de planification de système ou de produit, d'audit et d'administration</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour plus d'informations sur notre utilisation des cookies, de Google Analytics et des technologies associées, veuillez consulter notre politique en matière de cookies.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations sur le candidat</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' > CV, lettre de motivation, lettres de référence, antécédents professionnels et intérêts</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Pour les activités de dotation et de recrutement</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Maintenir un inventaire des candidats pour les opportunités de travail actuelles et futures</span></li>
</ul>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons également collecter et utiliser vos informations pour :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Comprendre vos besoins, la pertinence de nos produits et services, et évaluer les besoins futurs ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Fournir des services adaptés à vos besoins et vous traiter de manière plus personnelle ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Promouvoir et commercialiser nos produits et services auprès de vous ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Améliorer nos opérations commerciales et la qualité de nos produits et services ;</span></li>

    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Développer et tester de nouveaux produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Gérer nos besoins commerciaux et opérationnels ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Administrer et protéger la sécurité de notre entreprise et de nos sites Web, applications et autres services ;</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Respecter nos obligations légales et réglementaires, y compris pour faire respecter nos droits légaux ; et</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > Réaliser d'autres fins liées à l'un des éléments ci-dessus.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Informations dépersonnalisées, agrégées et anonymisées</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons utiliser vos informations personnelles pour générer des informations dépersonnalisées, agrégées ou anonymisées qui ne révèlent pas votre identité. RehvUp Technologies Inc. utilise ces informations pour effectuer des recherches, compiler des ensembles de données agrégées, des statistiques et des rapports, et pour effectuer des analyses sur nos services, nos normes de service, nos opérations commerciales et nos tendances.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons partager des informations dépersonnalisées, agrégées ou anonymisées avec nos clients à des fins de reporting, y compris l'utilisation de nos services, et avec des prestataires de services tiers à des fins de création de supports marketing, d'études de cas et d'analyses statistiques . Cela permet à RehvUp Technologies Inc., à ses clients et à nos fournisseurs de services tiers respectifs de comprendre nos performances ou de développer des produits, services ou offres pertinents.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Quand RehvUp Technologies Inc. partage-t-il vos informations personnelles ?</span></p>

<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. peut partager vos informations personnelles avec :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Autres entités de RehvUp Technologies Inc. afin de vous servir, y compris pour notre gestion interne et à des fins administratives.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Les fournisseurs de services tiers qui sont tenus de garder vos informations confidentielles et sécurisées et qui ne sont pas autorisés à utiliser ou à divulguer des informations pour des raisons autres que l'exécution de services en notre nom ou pour se conformer aux exigences légales.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Des tiers et partenaires en cas d'éventuelle fusion ou acquisition, apport d'actifs, réorganisation ou faillite. Ces parties sont également tenues de garder vos informations confidentielles et sécurisées et sont limitées dans leur utilisation des informations à cette fin.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Les organismes gouvernementaux, de réglementation et d'application de la loi pour respecter nos obligations en matière de conformité, de réglementation et de gestion des risques ou pour se conformer à la loi.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' > Le grand public et les autres utilisateurs lorsque vous publiez ou partagez des commentaires, des articles de blog, des témoignages ou d'autres informations similaires sur nos plates-formes technologiques</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;' >Votre organisme de parrainage ou votre fournisseur de régime de santé lorsque vous donnez votre consentement exprès ou implicite ou si nous sommes tenus de le faire par la loi.</span></li>
</ul>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Stockage de vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>RehvUp Technologies Inc. utilise des centres de données tiers tels qu'AWS pour stocker vos informations personnelles. &nbsp;Ces informations sont généralement stockées dans le pays où l'entreprise est située. &nbsp;De ce fait, il peut arriver que d'autres gouvernements étrangers, tribunaux, organismes chargés de l'application de la loi ou organismes de réglementation aient le droit d'accéder aux informations personnelles collectées et détenues par RehvUp Technologies Inc. ou nos sous-traitants.</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Si vous visitez notre application depuis un pays autre que le Canada, votre communication via notre application ou l'un de nos services peut entraîner le transfert d'informations au-delà des frontières internationales. En utilisant notre application ou l'un de nos services, vous consentez à la collecte, au stockage et au traitement de vos informations au Canada et dans d'autres pays (y compris les États-Unis, le Royaume-Uni et d'autres lieux) conformément à la législation applicable en matière de protection des données. </span></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Conservation de vos informations</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous ne conservons vos informations qu'aussi longtemps que cela est contractuellement, opérationnellement ou légalement nécessaire. Lorsque nous n'avons plus besoin des informations, elles sont soit détruites, soit anonymisées.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Garanties</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous utilisons des mesures de protection physiques, technologiques, organisationnelles et contractuelles raisonnables, adaptées à la sensibilité des informations, pour protéger les informations personnelles en notre possession ou sous notre contrôle contre tout accès, divulgation ou utilisation non autorisés.</ étendue></p>

<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Coordonnées</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >&nbsp;</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Veuillez soumettre toute question par e-mail à : info@rehvup.io</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;couleur:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Veuillez noter que nous devrons peut-être confirmer votre identité, demander des détails supplémentaires et travailler avec d'autres services de RehvUp Technologies Inc. pour vous répondre ou examiner vos préoccupations ou votre plainte.</span></ p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-family:"Arial",sans-serif;color:#141414;'>Modifications de notre politique de confidentialité </span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif ;color:#141414;'>Nous pouvons modifier cet avis de temps à autre et publierons la version la plus récente en ligne.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;' >Dernière mise à jour : décembre 2021</span></p>
<p style='margin:0in;font-size:16px;'>&nbsp;</p>
    </div>

   <div *ngIf="selectedLanguage!=='fr'">
        <p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:24px;color:#141414;" >Résumé</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">La gestion des renseignements personnels est fondamentale pour RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color :#141414;">&nbsp;Technologies Inc.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;"> et nous nous engageons &agrave; protéger votre vie privée.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (en)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">recueil et use des renseignements personnels pour vous identifier, établir votre admissibilité; et fournir un&nbsp;</span><span style="color:black;">contenu technologique afin&nbsp;</span><span style="font-size:18px;color:#141414;">détablir un état plus positif et général de bonheur et de bien-être.</span><span style="color:black;">&nbsp;</span><span style="font- size:18px;color:#141414;">Nous utilisons également vos informations &agrave; nos propres fins, y compris pour analyseur et améliorer nos services et pour les communications.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Veuillez consulter les titres ci-dessous pour obtenir des informations plus détails sur la fa&ccedil;on dont RehvUp</span><span style ="font-size:18px;color:#141414;">traite vos informations personnelles et sur tout sujet d'intérêt dans notre politique de confidentialité.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >&Agrave ; propos de cette politique de confidentialité</span></p>

<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous avons créé; cette politique de confidentialité&eacute; pour vous dire :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les renseignements personnels que nous conseillons de dispenser &agrave; votre sujet ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Ce que nous demandons faire avec ces renseignements personnels ; et</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Vos choix concernant les renseignements personnels que vous fournissez.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Cette politique couvre nos sites Web et notre application mobile.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px ;color:#141414;">Cette politique couvre spécifiquement notre traitement des informations personnelles relatives &agrave; des personnes identifiables, et ne s'applique pas aux informations commerciales exclusives.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Certains de nos services sont fournis au nom de nos clients, ce qui signifie que notre client reste principalement responsable de vos informations personnelles. Par exemple, nous pouvons fournir des services au nom de votre employeur ou de votre promoteur de régime. Dans ces circonstances, nous pouvons renvoyer une question sur notre utilisation de vos renseignements personnels &agrave; notre client.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Obtenir votre consentement</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Dans le cadre de l'utilisation de nos services ou de l'interaction avec nous, nous pouvons collecter et traiter certains détails concernant vous. Lorsque nous le faisons, nous recueillons, utilisonsons ou partageons vos renseignements personnels avec votre consentement aux fins dont nous vous avons informé, ou tel qu'il peut être autrement permis ou requis par la loi. Votre consentement peut être explicite ou implicite. Par exemple, en utilisant notre application,</span><span style="color:black;">vous</span><span style="font-size:18px;color:#141414;">consentez &agrave;&nbsp ;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">RehvUp</span><span style=" color:black ;">&nbsp;Technologies</span><span style="font-size:18px;color:#141414;">&nbsp;Inc.</span><span style="color:black;"> &nbsp;</span><span style="font-size:18px;color:#141414;">la collecte et l&rsquo;utilisation de vos renseignements personnels pour&nbsp;</span><span style="color:black;" >vous fournissez des&nbsp;</span><span style="font-size:18px;color:#141414;">services. Dans certaines situations, nous pouvons obtenir votre consentement directement (y compris comme écrit dans cette politique de confidentialité). Dans d'autres situations, nous pouvons nous fier au consentement que vous avez donné; &une tombe; votre employeur ou &agrave; votre promoteur d'avantages sociaux.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Vous pouvez refuser ou retirer votre consentement &agrave; ce que nous recueillons, utilisions ou partageons vos personnels, tant qu'il n'y a pas d'exigences légales ou contractuelles pour que nous traitions vos informations. Selon les circonstances, cependant, le retrait de votre consentement aura</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;" >&nbsp;un impact sur notre capacité&eacute; &une tombe; vous servir</span><span style="color:black;">&nbsp;et votre utilisation de</span><span style="font-size:18px;color:#141414;">&nbsp;l&rsquo;application .</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >O&ugrave; obtenons-nous vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous recueillons des renseignements personnels des fa&ccedil;ons suivantes :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Directement de vous ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De votre utilisation de RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.</span><span style="font-size:18px;">les sites Web et les applications ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De votre employeur, association, assureur ou promoteur de régime d'avantages sociaux;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous assistez &agrave; un Rehvup</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.,</span><span style= "color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;site ou événement;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous postulez pour un poste chez Rehvup</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.</ durée></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Si vous nous contactez avec une plainte ou une requête</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Lorsque vous vous engagez avec nous sur les médias sociaux ; et/ou</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >De tiers légalement autorisés.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Quelles informations nous recueillons et pourquoi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Nous pouvons collecter et utiliser les types d'informations suivantes aux fins suivantes :</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Catégorie de renseignements personnels</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur l'identité</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Types d'informations que nous pouvons collecter</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Votre nom, nom d'utilisateur, numéro d'employé ou identifiant similaire, état matrimonial, date de naissance et sexe déclaré</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Comment nous pouvons l'utiliser</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous identifier et vous authentifier</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour communiquer avec vous</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour créer et administrer votre compte lorsque vous vous inscrivez &agrave; notre service, y compris via nos sites Web et applications</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur l'emploi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Le titre de votre poste, votre lieu de travail, votre date d'embauche, vos antécédents professionnels et votre adresse professionnelle</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Informations sur le mode de vie</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Collections d'informations sur les domaines d'intérét que vous aimez afin</span><span style="color:black;">&nbsp;</span><span style="font-size:18px ;color:#141414;">&nbsp;de vous fournir des informations optimales ciblées sur vos besoins.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Informations d'interaction</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Enregistrements téléphoniques et transcriptions, enregistrés de communications (courriels, lettres, clavardage en ligne, etc.)</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >&Agrave ; des fins d&rsquo;assurance de la qualit&eacute; et de formation du personnel</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour conserver un enregistrement de vos interactions avec RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Technologies Inc.< /span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous fournir les services et les informations que vous demandez</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour communiquer avec vous et répondre &agrave; vos demandes de renseignements</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour comprendre vos préoccupations, afin que nous puissions résoudre les litiges et améliorer votre expérience</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Information sur l'interaction numérique</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Données de géolocalisation, adresse IP, données de connexion, type et version du navigateur, paramètre et emplacement du fuseau horaire, types et versions de plug-in de navigateur, système d'exploitation ( y compris le type d'appareil utilisé) et autres technologies, liées aux appareils que vous utilisez pour accéder &agrave; nos sites Web et / ou &agrave; nos applications</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour personnaliser votre expérience et comprendre comment vous utilisez nos sites et applications</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour vous informer de tout problème me concernant pertinent &une tombe; notre site Web ou &agrave; notre application (par exemple, les notifications push)</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour mesurer les performances de nos applications et sites Web</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Identifier les possibilités de nouveaux produits/services ou améliorations aux produits/services existants</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >&Agrave ; des fins de développement et de planification de systèmes ou de produits, d'audit et d'administration</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour plus d'informations proches &agrave; notre utilisation des cookies, de Google Analytics et de la technologie associée, veuillez consulter notre politique en matière de cookies.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements sur le candidat &agrave; un emploi</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Curriculum vitae, lettre de présentation, lettres de recommandation, antécédents professionnels et intérêts</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Pour les activités de dotation et de recrutement</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Tenir &agrave; jour un inventaire des candidats pour les possibilités d'emploi actuelles et futures</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons également collecter et utiliser vos informations pour :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Comprendre vos besoins, la pertinence de nos produits et services, et évaluer les besoins futurs ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Fournir des services adaptés &agrave; vos besoins et pour vous traiter d'une manière plus personnelle;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Promouvoir et commercialiser nos produits et services auprés de vous;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Améliorer nos opérations commerciales et la qualité; de nos produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Développer et mettre &agrave; l'essai de nouveaux produits et services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Gérer nos besoins opérationnels et opérationnels ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Administrer et protéger la sécurité de notre entreprise et de nos sites Web, applications et autres services ;</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Respecter nos obligations légales et réglementaires, y compris pour faire respecter nos droits légaux ; et</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Réaliser d'autres fins liees &agrave; l&rsquo;un des éléments ci-dessus.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Renseignements dépersonnalisés, agrégés et anonymisés</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons utiliser vos informations personnelles pour générer des informations dépersonnalisées, agrées ou anonymisées qui ne révèlent pas votre identité. RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc. (en)</ span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">utilise ces informations pour mener des recherches, compiler des ensembles de données ;es agrées, des statistiques et des rapports, et pour effectuer des analyses sur nos services, nos normes de service, nos opérations commerciales et nos tendances.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons partager des informations dépersonnalisées, agrées ou anonymisées avec nos clients &agrave; des fins de reporting, y compris l'utilisation de nos services, et avec des fournisseurs de services tiers pour une utilisation dans la création de documents marketing, études de cas et analyses statistiques. Cela permet &agrave; RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="font-size:18px;color:#141414;">, ses clients et nos fournisseurs de services tiers respectifs pour comprendre notre performance ou d&eacute ;développer des produits, des services ou des offres pertinentes.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Quand RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span ><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">partager vos renseignements personnels ?</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (fr)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">peut partager vos renseignements personnels avec :</span></p>
<ul style="margin-bottom:0in ;" type="disque">
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Autres Technologies RehvUp</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;">&nbsp;Inc.</span><span style= "color:black;">&nbsp;</span><span style="font-size:18px;">afin de vous servir, y compris &agrave; des fins de gestion interne et d'administration.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les fournisseurs de services tiers qui sont tenus de garder vos informations confidentielles et sécurisées et qui sont empêchés d'utiliser ou de divulguer des informations pour des raisons autres que la prestation de services en notre nom ou de se conformer aux exigences légales.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Tiers et associés en cas de fusion ou d'acquisition potentielle, de transfert d'actifs, de réorganisation ou de faillite. Ces parties sont également tenues de garder vos informations confidentielles et sécurisées et sont limitées dans leur utilisation des informations &agrave; cette fin.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Les organismes gouvernementaux, réglementaires et d'application de la loi pour respecter nos obligations en matière de conformité, de réglementation et de gestion des risques ou pour se conformer &agrave; la loi.</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Le grand public et d'autres utilisateurs lorsque vous publiez ou partagez des commentaires, des articles de blog, des témoignages ou d'autres informations similaires sur nos plateformes technologiques</span></li>
    <li style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;color:#141414;background:white;'><span style="font-size:18px;" >Votre organisme parrain ou votre fournisseur de régime de soins de santé; lorsque vous donnez votre consentement exprimé ou implicite ou si nous sommes tenus de le faire par la loi.</span></li>
</ul>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Stockage de vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">RehvUp Technologies Inc. (en)</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">utilise des centres de données tiers tels qu'AWS pour stocker vos informations personnelles. &nbsp;Ces informations sont généralement stockées dans le pays o&ugrave; l'entreprise est située.</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">Pour cette raison , il peut y avoir des circonstances o&ugrave; d'autres gouvernements, tribunaux, organismes d'application de la loi ou organismes de réglementation étrangers ont le droit d'accéder aux renseignements personnels recueillis et détenus par&nbsp;</span><span style=" color:black ;">&nbsp;</span><span style="font-size:18px;color:#141414;">RehvUp</span><span style="color:black;">&nbsp;</ span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="color:black;">&nbsp;</span><span style= "font-size:18px;color:#141414;">ou nos sous-traitants.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Si vous visitez notre application</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414; ">&nbsp;&agrave; partir d'un pays autre que le Canada, votre communication via notre&nbsp;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:# 141414;">application</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;ou l&rsquo;un de nos services peuvent entra&icirc;ner le transfert d&rsquo;informations au-del&agrave; des frontières internationales. En utilisant notre&nbsp;</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">application&nbsp;</span><span style="font-size:18px;color:#141414;">ou l&rsquo;un de nos services, vous consentez &agrave; la collecte, au stockage et au traitement de vos informations au Canada et dans d&rsquo;autres pays (y compris les &Eacute;tats-Unis, le Royaume-Uni&nbsp;</span><span style="color:black;">&nbsp ;</span><span style="font-size:18px;color:#141414;">et d&rsquo;autres endroits).</span><span style="color:black;">&nbsp;</span ><span style="font-size:18px;color:#141414;">) conformément &agrave; la législation applicable en matière de protection des données.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Conservation de vos informations</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous ne conservons vos informations que tant qu'elles sont contractuellement, opérationnellement ou légalement nécessaires. Lorsque nous n'avons plus besoin de l'information, elle est soit détruite, soit dépersonnalisée.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Mesures de protection</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous utilisons des mesures de protection physiques, technologiques, organisationnelles et contractuelles raisonnables, appropriées &agrave; la sensibilité des informations, pour protéger les informations personnelles en notre possession ou sous notre contrôle, contre l'accès, la divulgation ou l'utilisation non autorisée.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Coordonnées de la personne-ressource</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style='font-size:18px;font-family:"Arial ",sans-serif;couleur :#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Veuillez soumettre toute question par courriel &agrave; l'adresse suivante : info@rehvup.io</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style='font-size:18px ;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Veuillez noter que nous devrons peut-être confirmer votre identité, demander des détails supplémentaires et travailler avec d'autres RehvUp</span><span style="color:black ;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;Technologies Inc.</span><span style="font-size:18px;color:#141414;">pour vous répondre ou pour examiner vos préoccupations ou votre plainte.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="color:#141414;">Modifications apportées &agrave ; notre politique de confidentialité</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;margin-bottom:12.0pt;background:white;'><span style="font-size:18px ;color:#141414;">Nous pouvons modifier cet avis de temps &agrave; autre et publierons la version la plus récente en ligne.</span></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;background:white;'><span style="font-size:18px;color:#141414;" >Dernière mise en place&agrave; jour : décembre</span><span style="color:black;">&nbsp;</span><span style="font-size:18px;color:#141414;">&nbsp;2021</span ></p>
<p style='margin:0in;font-size:16px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    </div>
</div>
</body>
</html>`,
              }}
            />
            ):<RenderHtml
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
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>We may share de-identified, aggregated or anonymized information with our clients for reporting purposes, including usage of our services, and with third party service providers for use in creating marketing materials, cases studies and statistical analyses. This allows RehvUp Technologies Inc., its clients and our respective third‑party service providers to understand how we are performing, or develop relevant products, services or offers.</span></p>
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>When does RehvUp Technologies Inc. share your personal information?</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>&nbsp;</span></p>
<p style='margin:0in;font-size:16px;margin-bottom:12.0pt;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>RehvUp Technologies Inc. may share your personal information with:</span></p>
<ul style="margin-bottom:0in;" type="disc">
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Other RehvUp Technologies Inc. entities in order to serve you, including for our internal management and administrative purposes.</span></li>
    <li style='margin:0in;font-size:16px;color:#141414;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;'>Third‑party service providers who are required to keep your information confidential and secure and are restricted from using or disclosing information for reasons other than performing services on our behalf or to complying with legal requirements.</span></li>
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
<p style='margin:0in;font-size:16px;background:white;'><span style='font-size:16px;font-family:"Arial",sans-serif;color:#141414;'>Please submit any queries via email to: info@rehvup.io</span></p>
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
            />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
