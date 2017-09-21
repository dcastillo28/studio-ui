/**
 * WCM Search Plugin
 */
CStudioAuthoring.ContextualNav.WcmSearchMod = CStudioAuthoring.ContextualNav.WcmSearchMod || {

	initialized: false,
	
	/**
	 * initialize module
	 */
	initialize: function(config) {
		this.definePlugin();
		CStudioAuthoring.ContextualNav.WcmSearch.init();

	},
	
	definePlugin: function() {
		var YDom = YAHOO.util.Dom,
			YEvent = YAHOO.util.Event;
		/**
		 * WCM Search Contextual Nav Widget
		 */
		CStudioAuthoring.register({
			"ContextualNav.WcmSearch": {
				init: function() { 
					var e = YDom.get("acn-searchtext");
					YAHOO.util.Event.addListener(e, "click", this.doSearch);
					this.setDefaultSearchText();
					this.blurSearchText();
				},
				/**
				 * user has focused on search text box
				 */
				focusSearchText: function(e) {
					var e = YDom.get("acn-searchtext");
					YDom.setStyle(e, "color", "");
					e.value="";
					e.select();
				},
				/**
				 * handle on blur event
				 */
				blurSearchText: function(e) {
					var e = YDom.get("acn-searchtext");
					var searchVal = e.value;
					CStudioAuthoring.ContextualNav.WcmSearch.setDefaultSearchText();
				},
				/**
				 * set the search box to it's default search text value
				 */
				setDefaultSearchText: function() {
					var CMgs = CStudioAuthoring.Messages;
        			var contextNavLangBundle = CMgs.getBundle("contextnav", CStudioAuthoringContext.lang);
				},
				/**
				 * perform the search
				 */
				doSearch: function() {
					var searchContext = CStudioAuthoring.Service.createSearchContext();
					searchContext.keywords = encodeURIComponent("");
					searchContext.includeAspects = new Array();
					searchContext.includeAspects.push("cstudio-core%3ApageMetadata%7Ccstudio-core%3AdocumentMetadata");
					CStudioAuthoring.Operations.openSearch("default", searchContext, -1, "act", false, null, null, true);
				}
			}
		});
	}
}

CStudioAuthoring.Module.moduleLoaded("search", CStudioAuthoring.ContextualNav.WcmSearchMod);
