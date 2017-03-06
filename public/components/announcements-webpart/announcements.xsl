<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office"> 

	<xsl:template match="/">
		<div id="announcements-webpart">
			<h1><a href="http://sharepoint/staffhub/Lists/Announcements/AllItems.aspx">Announcements</a></h1>
			<xsl:apply-templates select="*"/>
		</div>
		<!--[[<xsl:copy-of select="*"/>]]-->
	</xsl:template>

	<xsl:template match="dsQueryResonse">
		<xsl:apply-templates select="Rows"/>
	</xsl:template>

	<xsl:template match="Rows">
		<ul>
			<xsl:apply-templates select="Row"/>
		</ul>
	</xsl:template>

	<xsl:template match="Row">
		<li>
			<h2>
				<xsl:value-of select="@Title" disable-output-escaping="yes"/>
			</h2>
			<div class="content clearfix">
				<xsl:if test="@StaffHubAnnouncementImage != ''">
					<div class="announcement-image">
						<xsl:choose>
							<xsl:when test="@StaffHubAnnouncementImageLink != ''">
								<a href="{@StaffHubAnnouncementImageLink}">
									<img src="{@StaffHubAnnouncementImage}" alt="{@StaffHubAnnouncementImage.desc}" />	
								</a>
							</xsl:when>
							<xsl:otherwise>
								<img src="{@StaffHubAnnouncementImage}" alt="{@StaffHubAnnouncementImage.desc}" class="announcement-image"/>
							</xsl:otherwise>
						</xsl:choose>
					</div>
				</xsl:if>
				<xsl:value-of select="@Body" disable-output-escaping="yes"/>
			</div>
			<div class="metadata">
				Posted at <strong><xsl:value-of select="@Modified"/></strong>
			</div>
		</li>
	</xsl:template>

</xsl:stylesheet>